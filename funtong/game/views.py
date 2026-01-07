from django.shortcuts import render, HttpResponse
from django.db import connection

from .models import GameModel

def index(request):
  cursor = connection.cursor()
  cursor.execute("SELECT * FROM user")

  rows = cursor.fetchall()

  for row in rows:
    print(row)

  return HttpResponse("Hello, world. You're at the polls index.")
def game_list(request):
  return HttpResponse("List of games")

def game_detail(request, game_id):
  return HttpResponse(f"Game ID: {game_id}")

def add_game(request):
  game = GameModel(name="game02", author="test02", price=2.02)

  game.save()

  return HttpResponse("Add game success")

def query_game(request):
  games = GameModel.objects.all()

  for game in games:
    print(f"Game Name: {game.name}, Author: {game.author}, Price: {game.price}")

  return HttpResponse("Query game success")

def filter_game(request):
  try:
    game = GameModel.objects.get(author="test03 ")
    print(f"Game Name: {game.name}, Author: {game.author}, Price: {game.price}")
  except GameModel.DoesNotExist:
    print("Game not found")
  
  return HttpResponse("Filter game success")
