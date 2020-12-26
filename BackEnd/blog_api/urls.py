from rest_framework.routers import DefaultRouter 
from .views import  PostList,  PostDetail, PostListDetailFilter, UserPostList, UserPostRetrive, AdminPostCreate
from django.urls import path
app_name='blog_api'


# router = DefaultRouter()
# router.register('', PostList , basename='user')

# urlpatterns = router.urls


urlpatterns =[
    path('search/', PostListDetailFilter.as_view(), name="search_post"),
    path('',PostList.as_view(),name='postList'),
    path('<int:pk>',PostDetail.as_view(),name='postList'),
    path('post/',PostList.as_view(),name='postList'),
    path('admin/',UserPostList.as_view(),name='userpostList'),
    path('admin/create/',AdminPostCreate.as_view(),name='AdminpostCreate'),
    path('admin/detail/<int:pk>',UserPostRetrive.as_view(),name='userpostList'),
    
]