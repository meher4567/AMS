from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)  # Password is hashed

    class Meta:
        db_table = 'custom_user'  # Your existing custom user table name
        managed = False

class Passenger(models.Model):
    passenger_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=20)
    passport_no = models.CharField(max_length=20, null=True, blank=True)
    date_of_birth = models.DateField()

    class Meta:
        db_table = 'passengers'  # Your existing passenger table name
        managed = False

class Flight(models.Model):
    flight_id = models.AutoField(primary_key=True)
    flight_number = models.CharField(max_length=20)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    origin = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)
    plane = models.ForeignKey('Plane', on_delete=models.CASCADE)
    status = models.CharField(max_length=20)

    class Meta:
        db_table = 'flights'  # Your existing flight table name
        managed = False

class Airport(models.Model):
    airport_code = models.CharField(max_length=10, primary_key=True)
    airport_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    class Meta:
        db_table = 'airports'  # Your existing airport table name
        managed = False

class Plane(models.Model):
    plane_id = models.AutoField(primary_key=True)
    model = models.CharField(max_length=50)
    capacity = models.IntegerField()
    manufacturer = models.CharField(max_length=50)

    class Meta:
        db_table = 'planes'  # Your existing plane table name
        managed = False

class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    booking_date = models.DateTimeField()
    payment = models.ForeignKey('Payment', on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    seat_number = models.CharField(max_length=10)
    booking_status = models.CharField(max_length=20)

    class Meta:
        db_table = 'bookings'  # Your existing booking table name
        managed = False

class Crew(models.Model):
    crew_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    role = models.CharField(max_length=20)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)

    class Meta:
        db_table = 'crew'  # Your existing crew table name
        managed = False

class CrewAssignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    crew = models.ForeignKey(Crew, on_delete=models.CASCADE)

    class Meta:
        db_table = 'crew_assignments'  # Your existing crew assignment table name
        managed = False

class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payments')
    payment_date = models.DateTimeField()
    payment_method = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'payments'  # Your existing payment table name
        managed = False

class Ticket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    ticket_number = models.CharField(max_length=20)
    seat_class = models.CharField(max_length=10)
    seat_number = models.CharField(max_length=20)
    issued_date = models.DateTimeField()

    class Meta:
        db_table = 'tickets'  # Your existing ticket table name
        managed = False

User = get_user_model()

class MyBookings(models.Model):
    booking_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    flight_id = models.IntegerField()  # Store the flight ID as an integer
    ticket_id = models.IntegerField()  # Store the ticket ID as an integer
    booking_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'mybookings'
        managed = False  # Prevent Django from managing this table

class Airline(models.Model):
    airline_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    iata_code = models.CharField(max_length=2, unique=True)

    class Meta:
        db_table = 'airlines'
        managed = False  # Prevent Django from managing this table
