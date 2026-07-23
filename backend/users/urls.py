from django.urls import path
from .views import (
    UserProfileView,
    UserRegistrationView,
    UserSearchView,
    ToggleFollowView,
    UserDetailView,
    UserProfileUpdateView,
    FollowersListView,
    FollowingListView,
)

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("profile/edit/", UserProfileUpdateView.as_view(), name="profile-edit"),
    path("<int:pk>/", UserDetailView.as_view(), name="user-detail"),
    path("<int:pk>/follow/", ToggleFollowView.as_view(), name="toggle-follow"),
    path("search/", UserSearchView.as_view(), name="user-search"),
    path(
    "<int:pk>/followers/",
    FollowersListView.as_view(),
    name="followers-list",
),

    path(
        "<int:pk>/following/",
        FollowingListView.as_view(),
        name="following-list",
    ),
]   