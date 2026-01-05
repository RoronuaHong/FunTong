from django.db import models

# Create your models here.
class GameModel(models.Model):
  name = models.CharField(max_length=100)
  author = models.CharField(max_length=20, null=False)
  pub_time = models.DateTimeField(auto_now_add=True)
  price = models.DecimalField(max_digits=5, decimal_places=2)
