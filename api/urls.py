from django.urls import path
from .views import RoomView
# remember to use [] with urlpatterns

urlpatterns = [
    path('room', RoomView.as_view()),
]