from .models import (
    Company, 
    CompanyBank,
)
from .serializers import (
    CompanySerializer,
    CompanyBankSerializer,
)
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

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
            serializer.is_valid(raise_exception=True)
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
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False, "message":"Company data updated successfully"}
        except:
            dict_response = {"error":True, "message":"Error during updating company data"}
        return Response(dict_response)


class CompanyBankViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def create(self, request):
        try:
            serializer = CompanyBankSerializer(data=request.data, context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False, "message":"Company bank data saved successfully"}
        except:
            dict_response = {"error":True, "message":"Error during saving company bank data"}
        return Response(dict_response)

    def list(self, request):
        company = CompanyBank.objects.all()
        serializer = CompanyBankSerializer(company, many=True, context={'request':request})
        response_dict = {"error":False, "message":"All Companies Bank List Data", "data":serializer.data}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        queryset = CompanyBank.objects.all()
        companybank = get_object_or_404(queryset, pk=pk)
        serializer = CompanyBankSerializer(companybank, context={"request":request})
        dict_response = {"error":False, "message":"Single data fetch","data":serializer.data}
        return Response(dict_response)

    def update(self, request, pk=None):
        queryset = CompanyBank.objects.all()
        companybank = get_object_or_404(queryset,pk=pk)
        serializer = CompanyBankSerializer(companybank, data=request.data, context={"request":request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        dict_response = {"error":False, "message":"Company bank data updated successfully"}
        return Response(dict_response)


class CompanyNameViewset(generics.ListAPIView):
    serializer_class = CompanySerializer
    def get_queryset(self):
        name = self.kwargs['name']
        return Company.objects.filter(name=name)


company_list = CompanyViewSet.as_view({"get":"list"})
company_create = CompanyViewSet.as_view({"post":"create"})
company_update = CompanyViewSet.as_view({"put":"update"})