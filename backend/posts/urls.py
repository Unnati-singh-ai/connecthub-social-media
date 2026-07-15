from django.urls import path
from .views import FeedView, PostDetailView, PostListCreateView, ToggleLikeView

urlpatterns = [
    path("", PostListCreateView.as_view(), name="post-list-create"),
    path("<int:pk>/", PostDetailView.as_view(), name="post-detail"),
    path("<int:pk>/like/", ToggleLikeView.as_view(), name="toggle-like"),
    path("feed/", FeedView.as_view(), name="feed"),
]