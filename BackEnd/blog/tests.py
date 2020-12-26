from django.test import TestCase
from django.contrib.auth.models import User
from .models import Post, Category
# Create your tests here.

class Test_create_post(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_category = Category.objects.create(name='django')
        test_user1 = User.objects.create_user(username='test_user1', password='123456789')
        test_post = Post.objects.create(author_id=1, Category_id=1,title='post_title',excerpt='Post excerpt', content='post Content', slug='post-title', status='published')

    def test_blog_content(self):
        post = Post.postobjects.get(id=1)
        cat = Category.objects.get(id=1)
        author = f'{post.author}'
        excerpt = f'{post.excerpt}'
        title = f'{post.title}'
        content = f'{post.content}'
        status = f'{post.status}'
        self.assertEqual(author, 'test_user1')
        self.assertEqual(excerpt, 'Post excerpt')
        self.assertEqual(title, 'post_title')
        self.assertEqual(content, 'post Content')
        self.assertEqual(status, 'published')
        self.assertEqual(str(post), 'post_title')
        self.assertEqual(str(cat), 'django')
