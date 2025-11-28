from django.urls import path, include
urlpatterns = [
    path('api/', include('realestate.urls')),
]
from django.contrib import admin
from django.urls import path, include
from realestate.views import home

urlpatterns = [
    path('', home),              # 👈 add this
    path('api/', include('realestate.urls')),
    path('admin/', admin.site.urls),
]
