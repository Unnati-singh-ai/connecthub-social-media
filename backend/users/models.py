from django.db import models
from django.contrib.auth.models import AbstractUser


from .managers import CustomUserManager
from cloudinary.models import CloudinaryField


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    bio = models.TextField(blank=True)
    profile_picture = CloudinaryField(
            "profile_picture",
            blank=True,
            null=True,
        )

    following = models.ManyToManyField(
        "self",
        symmetrical=False,
        related_name="followers",
        blank=True,
    )

    objects = CustomUserManager()

    def __str__(self):
        return self.username