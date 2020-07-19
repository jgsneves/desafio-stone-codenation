from django.contrib import admin
from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token

from projectAPI.api import views

urlpatterns = [
    #admin routes
    path('admin/', admin.site.urls),

    #users routes
    path('users/', views.get_users, name='users_list'),
    path('users/<int:pk>', views.get_single_user, name='single_user'),
    path('users/register/', views.sign_up_user, name='register_user'),

    #login/auth route
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    #report routes
    path('reports/', views.ReportListView.as_view(), name='reports_list'),
        # OBS: endpoint 'reports/' accepts query param ?page=int or ?search=string 
    path('reports/<int:pk>', views.handle_single_report, name='single_report'),
    path('reports/new', views.new_report, name='create_report'),
]
