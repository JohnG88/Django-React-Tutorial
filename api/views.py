from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

#  session is a way of how 2 devices connect, with a unique identity

# adding ListAPIView creates data into json into a list
# adding  CREATEAPIView shows it in (perhaps) nested json
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        # getting parameters from url
        code = request.GET.get(self.lookup_url_kwarg)
        #  fi code is not = to None
        if code != None:
            # room variable is = to room model and filter out the field of code is = to code variable above
            room = Room.objects.filter(code=code)
            #  if length of room is 0 
            if len(room) > 0:
                # get data of RoomSerializer, first room 
                data = RoomSerializer(room[0]).data
                # data is_host is = to check fi session key is == to first room host
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Dad Request': 'Code parameter not found in request'}, status.HTTP_400_BAD_REQUEST)

# APIView lets us dispatch to correct post, get put method
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # get hold of session id
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip = votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

