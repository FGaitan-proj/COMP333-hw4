from rest_framework import serializers
from .models import Artist, Rating, User

class ArtistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Artist
    fields = ('song', 'artist', 'year', 'genre')

class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rating
    fields = ('id', 'user', 'song', 'rating', 'description')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('user', 'password')
