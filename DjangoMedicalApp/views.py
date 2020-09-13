from .models import Company
from .serializers import CompanySerializer

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        company = Company.objects.all()
        serializer = CompanySerializer(company, many=True, context={'request':request})
        response_dict = {"error":False, "message":"All Company List Data", "data":serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = CompanySerializer(data=request.data, context={"request":request})
            serializer.is_valid()
            serializer.save()
            dict_response = {"error":False, "message":"Company data saved successfully"}
        except:
            dict_response = {"error":True, "message":"Error during saving company data"}
        return Response(dict_response)

    def update(self, request, pk=None):
        try:
            queryset = Company.objects.all()
            company = get_object_or_404(queryset,pk=pk)
            serializer = CompanySerializer(company, data=request.data, context={"request":request})
            serializer.is_valid()
            serializer.save()
            dict_response = {"error":False, "message":"Company data updated successfully"}
        except:
            dict_response = {"error":True, "message":"Error during updating company data"}
        return Response(dict_response)

company_list = CompanyViewSet.as_view({"get":"list"})
company_create = CompanyViewSet.as_view({"post":"create"})
company_update = CompanyViewSet.as_view({"put":"update"})