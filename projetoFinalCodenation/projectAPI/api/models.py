from django.db import models
from django.contrib.auth.models import User

type_choices = [
    ('DEBUG', 'DEBUG'),
    ('WARNING', 'WARNING'),
    ('ERROR', 'ERROR'),
]

# Create your models here.
class Report(models.Model):
    log             = models.CharField(max_length=25)
    title           = models.CharField(max_length=25)
    details         = models.TextField(max_length=100)
    type_of         = models.CharField(max_length=25, choices=type_choices)
    count_of_events = models.IntegerField()
    coleted_by      = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at      = models.DateTimeField(auto_now_add=True)
    archived        = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']