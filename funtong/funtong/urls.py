"""
URL configuration for funtong project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, reverse
from django.shortcuts import HttpResponse

# def index(request):
#     print(222, reverse('index'))
#     return HttpResponse("Hello,  World!")

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("index/", index, name='index'),
    # path("game/", views.game_detail),
    # path("game/<int:game_id>", views.game_detail_path),
    path("game/", include("game.urls")),
]
