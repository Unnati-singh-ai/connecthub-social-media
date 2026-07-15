from django.urls import path
from .views import UserProfileView, UserRegistrationView
from .views import ToggleFollowView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("<int:pk>/follow/", ToggleFollowView.as_view(), name="toggle-follow"),
]