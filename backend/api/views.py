from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Review

# class for geting our review list for a user
class ReviewListCreate(generics.ListCreateAPIView):
	serializer_class = ReviewSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return Review.objects.filter(author=user)
	
	#tells us whatever data is received is valid
	def perform_create(self,serializer):
		if serializer.is_valid():
			#manually add author because its read only
			serializer.save(author=self.request.user)
		else:
			print(serializer.errors)

# class for deleting reviews, only works if user is authenticated
class ReviewDelete(generics.DestroyAPIView):
	queryset = ReviewSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return Review.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [AllowAny]