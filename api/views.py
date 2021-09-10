from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.

# adding ListAPIView creates data into json into a list
# adding  CREATEAPIView shows it in (perhaps) nested json
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer