from django.shortcuts import render
from rest_framework import viewsets # We use a viewset.
from .serializers import ArtistSerializer, RatingSerializer, UserSerializer # Import our serializer file.
from .models import Artist, Rating, User # Import our Artists model.

class ArtistView(viewsets.ModelViewSet):
  serializer_class = ArtistSerializer
  queryset = Artist.objects.all()

class RatingView(viewsets.ModelViewSet):
  serializer_class = RatingSerializer
  queryset = Rating.objects.all()

class UserView(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()