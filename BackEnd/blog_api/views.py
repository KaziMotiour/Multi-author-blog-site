from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView, ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated, DjangoModelPermissionsOrAnonReadOnly
from .permission import IsOwnerOrReadOnly
from rest_framework import filters
from rest_framework import status 
# Create your views here.

# class PostList(viewsets.ModelViewSet):
#     permission_classes = [IsOwnerOrReadOnly]
#     serializer_class = PostSerializer

#     # def get_object(self, queryset=None, **kwargs):
#     #     id = self.kwargs.get('pk')
#     #     post = Post.objects.get(slug=id)
#     #     return post

#     def get_queryset(self):
#         # print(self.get_object())
#         return Post.objects.all()


# class PostList(viewsets.ViewSet):
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     queryset = Post.objects.all()

#     def list(self, request):
#         serializer_class = PostSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)
    
#     def retrieve(self, request, pk=None):
#         post = Post.objects.get(pk=pk)
#         serializer_class = PostSerializer(post)
#         return Response(serializer_class.data)
    




class PostList(ListCreateAPIView):
    
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Post.postobjects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetail(RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer

class  PostListDetailFilter(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']


# admin

class UserPostList(ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()



class AdminPostCreate(APIView):
    parser_classes=[MultiPartParser, FormParser]
    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserPostRetrive(RetrieveUpdateDestroyAPIView):

    serializer_class = PostSerializer
    queryset=Post.objects.all()


    
