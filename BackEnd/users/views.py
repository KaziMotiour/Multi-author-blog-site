from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import RegisterUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        res_serializer = RegisterUserSerializer(data=request.data)
        if res_serializer.is_valid():
            new_user =res_serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(res_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)