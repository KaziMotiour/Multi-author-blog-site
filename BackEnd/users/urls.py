from django.urls import path, include
from .views import CustomUserCreate, BlacklistTokenView

urlpatterns = [
    path('register/',CustomUserCreate.as_view(), name='NewUser'),
    path('logout/blacklist/',BlacklistTokenView.as_view(), name='logout'),
]