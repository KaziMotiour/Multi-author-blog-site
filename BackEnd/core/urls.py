
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.schemas import get_schema_view
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('', include('blog.urls'), name='blog'),
    path('api/user/', include('users.urls'), name='blog'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('blog_api.urls'), name='blog'),
    path('docs/', include_docs_urls(title="blogapi")),
    path('schemas/', get_schema_view(
        title="Your Project",
        description="API for all things …",
        version="1.0.0"
    ), name='openapi-schema'),

] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
