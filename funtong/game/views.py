from django.shortcuts import render, HttpResponse
from django.db import connection

def index(request):
  cursor = connection.cursor()
  cursor.execute("SELECT * FROM user")

  rows = cursor.fetchall()

  for row in rows:
    print(row)

  return HttpResponse("Hello, world. You're at the polls index.")

# Create your views here
def game_detail(request):
  game_id = request.GET.get('id')
  return HttpResponse(f"Game ID: {game_id}")

def game_detail_path(request, game_id):
  return HttpResponse(f"Game ID from path: {game_id}")


def game_list(request):
  return HttpResponse("List of games")

def game_detail(request, game_id):
  return HttpResponse(f"Game ID: {game_id}")