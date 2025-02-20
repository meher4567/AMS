from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model  # This will allow you to get the custom user model
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.db.models import Q
import random
from .models import Passenger, Flight, Airport, Plane, Booking, Crew, CrewAssignment, Payment, Ticket,Airline
from .serializers import (PassengerSerializer, FlightSerializer, AirportSerializer, PlaneSerializer,MyBookings,
                          BookingSerializer, CrewSerializer, CrewAssignmentSerializer, PaymentSerializer,TicketSerializer,
                          MyBookingsSerializer,AirlineSerializer,SignUpSerializer, SignInSerializer)
from .models import CustomUser
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from datetime import datetime
from django.views import View
from django.utils import timezone
from django.db import transaction


User = get_user_model()  

from django.contrib.auth import authenticate, login

class PassengerViewSet(viewsets.ModelViewSet):
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer
    
    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            return Passenger.objects.filter(
                Q(first_name__icontains=query) | 
                Q(last_name__icontains=query) | 
                Q(email__icontains=query)
            )
        return super().get_queryset()

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            return Flight.objects.filter(
                Q(flight_number__icontains=query) |
                Q(origin__icontains=query) |
                Q(destination__icontains=query)
            )
        return super().get_queryset()

class AirportViewSet(viewsets.ModelViewSet):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer

class PlaneViewSet(viewsets.ModelViewSet):
    queryset = Plane.objects.all()
    serializer_class = PlaneSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            return Booking.objects.filter(
                Q(passenger__first_name__icontains=query) |
                Q(flight__flight_number__icontains=query)
            )
        return super().get_queryset()

class CrewViewSet(viewsets.ModelViewSet):
    queryset = Crew.objects.all()
    serializer_class = CrewSerializer

class CrewAssignmentViewSet(viewsets.ModelViewSet):
    queryset = CrewAssignment.objects.all()
    serializer_class = CrewAssignmentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class AirlineViewSet(viewsets.ModelViewSet):
    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer
    
class SignUpView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if the username already exists
        if CustomUser.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        user = CustomUser.objects.create_user(username=username, email=email, password=password)

        # Temporarily remove token creation to test
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


class SignInView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user with the custom user model
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class FlightSearchView(View):
    def get(self, request):
        print("Flight search endpoint called")
        
        # Retrieve search parameters
        source = request.GET.get('source')
        destination = request.GET.get('destination')
        start_date = request.GET.get('startDate')
        end_date = request.GET.get('endDate')
        
        print(f"Source: {source}, Destination: {destination}, Start Date: {start_date}, End Date: {end_date}")

        try:
            # Process start date
            if start_date:
                print("Processing start_date...")
                start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
                start_date = timezone.make_aware(datetime.combine(start_date, datetime.min.time()))
                print(f"Converted start_date to: {start_date}")
            else:
                print("No start_date provided.")

            # Process end date
            if end_date:
                print("Processing end_date...")
                end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
                end_date = timezone.make_aware(datetime.combine(end_date, datetime.max.time()))
                print(f"Converted end_date to: {end_date}")
            else:
                print("No end_date provided.")

            # Step 1: Fetch all flights
            print("Fetching all flights...")
            flights = Flight.objects.all()
            print(f"Total flights fetched: {flights.count()}")

            # Step 2: Filter flights based on the search criteria
            print("Filtering flights...")
            if source and destination and start_date and end_date:
                # Filter based on all parameters
                filtered_flights = flights.filter(
                    origin=source,
                    destination=destination,
                    departure_time__range=[start_date, end_date]
                )
            elif start_date and end_date:
                # Show all flights within the specified date range
                filtered_flights = flights.filter(departure_time__range=[start_date, end_date])
            else:
                # No filtering applied, return all flights after the current time
                current_time = timezone.now()
                filtered_flights = flights.filter(departure_time__gt=current_time)
                print(f"Showing all flights after current time: {current_time}")

            print(f"Filtered flights count: {filtered_flights.count()}")
            print(f"Filtered flights: {filtered_flights}")

            # Step 3: Fetch airports and planes
            print("Fetching airports and planes...")
            airports = Airport.objects.all()
            planes = Plane.objects.all()

            enriched_flights = []
            print("Enriching flight data...")

            for flight in filtered_flights:
                origin_airport = airports.filter(airport_code=flight.origin).first()
                destination_airport = airports.filter(airport_code=flight.destination).first()
                plane = planes.filter(plane_id=flight.plane_id).first()

                # Calculate seat distribution
                capacity = plane.capacity if plane else 0
                economy_seats = (capacity * 3) // 6
                business_seats = (capacity * 2) // 6
                first_class_seats = capacity - economy_seats - business_seats

                # Generate random fares
                economy_fare = random.randint(1000, 2000)
                business_fare = economy_fare + random.randint(500, 1000)
                first_class_fare = business_fare + random.randint(1000, 2000)

                enriched_flight = {
                    'flight_id': flight.flight_id,  # Include flight_id
                    'flightNumber': flight.flight_number,
                    'airplane': plane.model if plane else 'Unknown Model',
                    'departureTime': flight.departure_time,
                    'arrivalTime': flight.arrival_time,
                    'source': origin_airport.airport_name if origin_airport else 'Unknown Source',
                    'destination': destination_airport.airport_name if destination_airport else 'Unknown Destination',
                    'economyFare': economy_fare,
                    'businessFare': business_fare,
                    'firstClassFare': first_class_fare,
                    'status': flight.status,
                    'seats': {
                        'economy': economy_seats,
                        'business': business_seats,
                        'firstClass': first_class_seats
                    }
                }

                enriched_flights.append(enriched_flight)

            # Step 4: Return the enriched data as a JSON response
            print("Returning enriched flight data as JSON response...")
            return JsonResponse(enriched_flights, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)

class UserProfileView(View):
    def get(self, request, username):
        try:
            # Fetch the user based on the provided username
            user = CustomUser.objects.get(username=username)
            # Prepare the response data
            response_data = {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
            }
            return JsonResponse(response_data, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        


class CreateBookingView(APIView):
    @transaction.atomic
    def post(self, request):
        data = request.data
        print("Received data:", data)
        
        try:
            # Extract data
            flight_data = data.get('flight')
            payment_data = data.get('payment')
            passenger_data = data.get('passengers')
            booking_data = data.get('booking')
            username = data.get('username')  # Get the username from the request

            print("Extracted flight_data:", flight_data)
            print("Extracted payment_data:", payment_data)
            print("Extracted passenger_data:", passenger_data)
            print("Extracted booking_data:", booking_data)

            # Validate username and get the User instance
            user_instance = User.objects.get(username=username)

            # Insert passengers and collect their IDs
            passenger_ids = []
            for i, passenger in enumerate(passenger_data):
                print(f"Processing passenger {i}:", passenger)
                serializer = PassengerSerializer(data=passenger)
                if serializer.is_valid():
                    passenger_instance = serializer.save()
                    passenger_ids.append(passenger_instance.passenger_id)
                    print("Saved passenger ID:", passenger_instance.passenger_id)
                else:
                    print("Passenger validation error:", serializer.errors)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            seat_numbers = booking_data.get('seatNumbers', [])
            # Create bookings and payment records for each passenger
            for index, passenger_id in enumerate(passenger_ids):
                print("Creating booking for passenger ID:", passenger_id)
                if index < len(seat_numbers):
                    seat_number = seat_numbers[index]
                else:
                    print(f"No seat number provided for passenger {passenger_id}")
                    return Response(
                        {"detail": f"Seat number missing for passenger {passenger_id}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                # Create the booking entry
                booking_record = {
                    **booking_data,
                    'passenger': passenger_id,
                    'flight': flight_data['flight_id'],
                    'seat_number': seat_number,
                    'username': user_instance  # Use the User instance here
                }
                booking_serializer = BookingSerializer(data=booking_record)
                if booking_serializer.is_valid():
                    booking_instance = booking_serializer.save()
                    print("Booking created with ID:", booking_instance.booking_id)
                else:
                    print("Booking validation error:", booking_serializer.errors)
                    return Response(booking_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                # Create the payment entry for this booking
                payment_record = {
                    **payment_data,
                    'booking': booking_instance.booking_id,
                    'payment_date': datetime.now()
                }
                payment_serializer = PaymentSerializer(data=payment_record)
                if payment_serializer.is_valid():
                    payment_serializer.save()
                    print("Payment created for booking ID:", booking_instance.booking_id)
                else:
                    print("Payment validation error:", payment_serializer.errors)
                    return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                # Create the ticket entry for each booking
                ticket_record = {
                    'booking': booking_instance.booking_id,
                    'ticket_number': f'TK{int(booking_instance.booking_id)}{int(passenger_id)}{index}',  # Unique ticket number logic
                    'seat_class': booking_data.get('seatClass'),
                    'seat_number': booking_data.get('seatNumbers')[index],  # Corresponding seat number from the frontend
                    'issued_date': timezone.now()  # Issue date at the time of ticket creation
                }
                ticket_serializer = TicketSerializer(data=ticket_record)
                if ticket_serializer.is_valid():
                    ticket_instance = ticket_serializer.save()
                    print("Ticket created with number:", ticket_record['ticket_number'])
                    flight_instance = Flight.objects.get(flight_id=flight_data['flight_id'])
                    # Create a MyBookings record
                    my_booking_data = {
                        'username': user_instance.username,  # Save the user instance here
                        'flight_id': flight_data['flight_id'],
                        'ticket_id': ticket_instance.ticket_id,  # Use the ticket instance ID
                        'booking_date': datetime.now()
                    }
                    my_booking_serializer = MyBookingsSerializer(data=my_booking_data)
                    if my_booking_serializer.is_valid():
                        my_booking_serializer.save()
                        print("MyBooking record created")
                    else:
                        print("MyBooking validation error:", my_booking_serializer.errors)

                else:
                    print("Ticket validation error:", ticket_serializer.errors)
                    return Response(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            print("Booking and tickets created successfully for all passengers")
            return Response({'message': 'Booking and tickets created successfully for all passengers'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print("Exception occurred:", str(e))
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class BookingsView(APIView):
    def get(self, request, username):
        # Retrieve bookings for the given username
        bookings = MyBookings.objects.filter(username=username).order_by('-booking_date')
        
        booking_data = []
        
        for booking in bookings:
            # Retrieve flight details
            flight = get_object_or_404(Flight, flight_id=booking.flight_id)
            flight_data = {
                "flight_number": flight.flight_number,
                "departure_time": flight.departure_time,
                "arrival_time": flight.arrival_time,
                "origin": flight.origin,
                "destination": flight.destination,
            }
            
            # Retrieve ticket details
            ticket = get_object_or_404(Ticket, ticket_id=booking.ticket_id)
            ticket_data = {
                "ticket_number": ticket.ticket_number,
                "seat_class": ticket.seat_class,
                "seat_number": ticket.seat_number,
            }
            
            # Combine booking, flight, and ticket data
            booking_data.append({
                "booking_id": booking.booking_id,
                "booking_date": booking.booking_date,
                "flight": flight_data,
                "ticket": ticket_data,
            })
        
        return Response({"bookings": booking_data})
    
    
@api_view(['POST'])
def assigncrewtoflight(request):
    flight_id = request.data.get('flight_id')
    crew_assignments = request.data.get('crew_assignments', [])

    if not flight_id or not crew_assignments:
        return Response({'error': 'Flight ID and crew assignments are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        flight = Flight.objects.get(flight_id=flight_id)

        # Process crew assignments
        for assignment in crew_assignments:
            crew_id = assignment.get('crew_id')
            role = assignment.get('role')

            if not crew_id or not role:
                return Response({'error': 'Both crew ID and role are required for each assignment.'}, status=status.HTTP_400_BAD_REQUEST)

            # Perform your checks with the role if needed
            # For example, you could check if the role is valid or perform business logic
            print(f"Assigning Crew ID: {crew_id} as {role} to Flight ID: {flight_id}")
            
            # Here you can also perform any role-based logic you need without modifying CrewAssignment

            # If you still want to create a CrewAssignment without the role
            crew = Crew.objects.get(crew_id=crew_id)
            CrewAssignment.objects.create(flight=flight, crew=crew)  # Only store flight and crew

        return Response({'message': 'Crew assigned successfully.'}, status=status.HTTP_201_CREATED)

    except Flight.DoesNotExist:
        return Response({'error': 'Flight not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Crew.DoesNotExist:
        return Response({'error': 'Crew member not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
