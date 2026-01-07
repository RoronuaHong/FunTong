from django.urls import path
from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('list', views.game_list, name='list'),
    path('add', views.add_game, name='add_game'),
    path('query', views.query_game, name='query_game'),
    path('filter', views.filter_game, name='filter_game'),
    path('detail/<int:game_id>', views.game_detail, name='game_detail'),
]
