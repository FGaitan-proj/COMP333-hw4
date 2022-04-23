from django.contrib import admin
from .models import User, Rating, Artist

class UserAdmin(admin.ModelAdmin):
    list_display = ('user', 'password')

class RatingAdmin(admin.ModelAdmin):
    list_display = ('id' ,'user', 'song', 'rating', 'description')

class ArtistAdmin(admin.ModelAdmin):
    list_display = ('song', 'artist', 'genre', 'year')

admin.site.register(User, UserAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(Artist, ArtistAdmin)
