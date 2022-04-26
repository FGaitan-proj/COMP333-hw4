from django.db import models

class User(models.Model):
    user = models.CharField(max_length=100, primary_key=True)
    password = models.CharField(max_length=100)
    def __str__(self):
        return self.user

class Artist(models.Model):
    song = models.CharField(max_length=200, primary_key=True)
    artist = models.CharField(max_length=200)
    genre = models.CharField(max_length=100)
    year = models.IntegerField(default=0)
    def __str__(self):
        return self.song

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Artist, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    description = models.CharField(max_length=200)
    def __str__(self):
        return self.id
    
class Similar(models.Model):
    song = models.ForeignKey(Artist, on_delete=models.CASCADE)
    rec = models.CharField(max_length=200)
    def __str__(self):
        return self.song.song
