from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Report
from .serializers import UserSerializer, RegisterUserSerializer, ReportSerializer


# Users views #

@api_view()
@permission_classes([IsAuthenticated])
def get_users(request):
    queryset = User.objects.all()
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view()
@permission_classes([IsAuthenticated])
def get_single_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def sign_up_user(request):
    serializer = RegisterUserSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        account = serializer.save()
        data['username'] = account.username
        data['email'] = account.email
    else:
        data = serializer.errors
    return Response(data)

# Report views #


class ReportListView(ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('title', 'details', 'type_of', 'archived',)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def handle_single_report(request, pk):
    report = get_object_or_404(Report, pk=pk)

    if request.method == 'GET':
        serializer = ReportSerializer(report)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ReportSerializer(report, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Report changed"})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        operation = report.delete()

        if operation:
            return Response({"message": "Report Deleted"})
        else:
            return Response({"message": "Report not deleted"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_report(request):
    request.data['coleted_by'] = request.user.id
    request.data['author'] = request.user.username
    serializer = ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)