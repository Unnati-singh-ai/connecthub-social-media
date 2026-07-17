from rest_framework import serializers
from .models import Post
import os


class PostSerializer(serializers.ModelSerializer):

    author = serializers.ReadOnlyField(source="author.username")
    
    def validate_image(self, value):
      if value:
        # Maximum file size: 5 MB
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError(
                "Image size must be less than 5 MB."
            )

        # Allowed extensions
        valid_extensions = [".jpg", ".jpeg", ".png", ".webp"]

        ext = os.path.splitext(value.name)[1].lower()

        if ext not in valid_extensions:
            raise serializers.ValidationError(
                "Only JPG, JPEG, PNG, and WEBP images are allowed."
            )

        return value

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "content",
            "image",
            "created_at",
            "updated_at",
        ]