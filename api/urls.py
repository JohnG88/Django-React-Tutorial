from django.urls import path
from .views import RoomView
# remember to use [] with urlpatterns

urlpatterns = [
    path('home', RoomView.as_view()),
]