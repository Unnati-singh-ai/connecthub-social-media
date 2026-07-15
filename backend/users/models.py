from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    objects = CustomUserManager()

    def __str__(self):
        return self.username
    
    following = models.ManyToManyField(
    "self",
    symmetrical=False,
    related_name="followers",
    blank=True
)