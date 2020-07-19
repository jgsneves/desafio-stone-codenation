from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Report

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
            'is_staff',
            'is_superuser',
        ]

class RegisterUserSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(
        style={'input_type': 'password'}, 
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'password2',
        ]

    def save(self):
        account = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password2 != password:
            raise serializers.ValidationError({'password': 'Passwords must match'})

        account.set_password(password)
        account.save()
        return account

class ReportSerializer(serializers.ModelSerializer):

    author = serializers.SerializerMethodField('get_username_from_coleted_by')
    class Meta:
        model = Report
        fields = [
            'id',
            'log',
            'title',
            'details',
            'type_of',
            'count_of_events',
            'coleted_by',
            'author',
            'created_at',
            'archived',
        ]

    def get_username_from_coleted_by(self, report):
        author = report.coleted_by.username
        return author