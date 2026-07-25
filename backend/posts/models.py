from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField


class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts"
    )
    content = models.TextField()
    

    image = CloudinaryField(
        "post_image",
        blank=True,
        null=True,
    )
    likes = models.ManyToManyField(
    settings.AUTH_USER_MODEL,
    related_name="liked_posts",
    blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.author.username