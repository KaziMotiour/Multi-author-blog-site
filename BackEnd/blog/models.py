from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
# Create your models here.

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Post(models.Model):
    
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )


    author = models.ForeignKey(settings.AUTH_USER_MODEL,  on_delete=models.CASCADE, related_name='blog_post')
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=250)
    image = models.ImageField(_("image"), upload_to=upload_to, default='posts/default.jpg')     
    excerpt = models.TextField(null=True)
    content = models.TextField()
    published = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=50, choices=options, default='published')
    objects =models.Manager() 
    postobjects = PostObjects()

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return str(self.title) 
    


