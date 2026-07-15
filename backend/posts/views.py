from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
    
class ToggleLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)

        if request.user in post.likes.all():
            post.likes.remove(request.user)
            return Response(
                {"message": "Post unliked"},
                status=status.HTTP_200_OK
            )

        post.likes.add(request.user)
        return Response(
            {"message": "Post liked"},
            status=status.HTTP_200_OK
        )


class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
