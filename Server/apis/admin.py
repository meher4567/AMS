from django.contrib import admin
from .models import Passenger, Flight, Airport, Plane, Booking, Crew, CrewAssignment, Payment, Ticket

admin.site.register(Passenger)
admin.site.register(Flight)
admin.site.register(Airport)
admin.site.register(Plane)
admin.site.register(Booking)
admin.site.register(Crew)
admin.site.register(CrewAssignment)
admin.site.register(Payment)
admin.site.register(Ticket)
