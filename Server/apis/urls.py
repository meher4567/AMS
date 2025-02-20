from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (PassengerViewSet, FlightViewSet, AirportViewSet, PlaneViewSet, BookingViewSet, AirlineViewSet,
                    CrewViewSet, CrewAssignmentViewSet, PaymentViewSet, TicketViewSet, SignUpView, SignInView,FlightSearchView,CreateBookingView,BookingsView,UserProfileView)
from .views import assigncrewtoflight 

router = DefaultRouter()
router.register(r'passengers', PassengerViewSet)
router.register(r'flights', FlightViewSet)
router.register(r'airports', AirportViewSet)
router.register(r'planes', PlaneViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'crew', CrewViewSet)
router.register(r'crewassignments', CrewAssignmentViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'airlines', AirlineViewSet)


urlpatterns = [
    path('', include(router.urls)),  # Include router URLs under the base path
    path('flightssearch/', FlightSearchView.as_view(), name='flightssearch'),  # Add this line for flight search
    path('createbooking/', CreateBookingView.as_view(), name='createbooking'),
    path('getbookings/<str:username>/', BookingsView.as_view(), name='getbookings'),
    path('profile/<str:username>/', UserProfileView.as_view(), name='user-profile'),
    path('assigncrew/', assigncrewtoflight, name='assigncrewtoflight'),
    path('signup/', SignUpView.as_view(), name='signup'),  # No 'api/' prefix needed
    path('signin/', SignInView.as_view(), name='signin'),  # No 'api/' prefix needed
]
