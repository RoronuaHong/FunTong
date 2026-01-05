from django.urls import path
from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('list', views.game_list, name='list'),
    path('detail/<int:game_id>', views.game_detail, name='game_detail'),
]
