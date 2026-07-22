from rest_framework import generics
from .models import CustomUser
from .serializers import UserRegistrationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .serializers import UserSearchSerializer
from rest_framework.filters import SearchFilter
from .serializers import UserDetailSerializer
from .serializers import (
    UserProfileUpdateSerializer,
)

class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
            "bio": request.user.bio,
            "profile_picture": request.user.profile_picture.url if request.user.profile_picture else None,
            "followers_count": request.user.followers.count(),
            "following_count": request.user.following.count(),
        })

class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

class ToggleFollowView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        user_to_follow = get_object_or_404(CustomUser, pk=pk)

        if request.user == user_to_follow:
            return Response(
                {"error": "You cannot follow yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user_to_follow in request.user.following.all():
            request.user.following.remove(user_to_follow)
            return Response(
                {"message": "User unfollowed"},
                status=status.HTTP_200_OK,
            )

        request.user.following.add(user_to_follow)
        return Response(
            {"message": "User followed"},
            status=status.HTTP_200_OK,
        )
    
class UserSearchView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSearchSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [SearchFilter]
    search_fields = ["username", "email"]   