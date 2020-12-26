from blog.models import Post, Category
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    
    Category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    class Meta:
        model = Post
        fields = ['id','author','Category', 'title','image', 'excerpt', 'content', 'status',]