from .models import (
    Company,
    Medicine,
    MedicalDetails,
    Employee,
    Customer,
    Bill,
    EmployeeSalary,
    BillDetails,
    CustomerRequest,
    CompanyAccount,
    CompanyBank,
    EmployeeBank,
)
from .serializers import (
    CompanySerializer,
    CompanyBankSerializer,
    MedicineSerializer,
    MedicalDetailsSerializer,
    MedicalDetailsSerializerSimple,
    EmployeeSerializer,
    CustomerSerializer,
    BillSerializer,
    EmployeeSalarySerializer,
    BillDetailsSerializer,
    CustomerRequest,
    CompanyAccountSerializer,
    EmployeeBankSerializer,
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
        serializer = CompanySerializer(
            company, many=True, context={'request': request})
        response_dict = {
            "error": False, "message": "All Company List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = CompanySerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Company data saved successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error during saving company data"}
        return Response(dict_response)

    def retrieve(self, request, pk=None):
        queryset = Company.objects.all()
        company = get_object_or_404(queryset, pk=pk)
        serializer = CompanySerializer(company, context={"request": request})

        serializer_data = serializer.data
        # Accessing All the Medicine Details of Current Medicine ID
        company_bank_details = CompanyBank.objects.filter(
            company_id=serializer_data["id"])
        companybank_details_serializers = CompanyBankSerializer(
            company_bank_details, many=True)
        serializer_data["company_bank"] = companybank_details_serializers.data

        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self, request, pk=None):
        try:
            queryset = Company.objects.all()
            company = get_object_or_404(queryset, pk=pk)
            serializer = CompanySerializer(
                company, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Company data updated successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error during updating company data"}
        return Response(dict_response)


class CompanyBankViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        try:
            serializer = CompanyBankSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Company bank data saved successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error during saving company bank data"}
        return Response(dict_response)

    def list(self, request):
        company = CompanyBank.objects.all()
        serializer = CompanyBankSerializer(
            company, many=True, context={'request': request})
        response_dict = {
            "error": False, "message": "All Companies Bank List Data", "data": serializer.data}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        queryset = CompanyBank.objects.all()
        companybank = get_object_or_404(queryset, pk=pk)
        serializer = CompanyBankSerializer(
            companybank, context={"request": request})
        dict_response = {"error": False,
                         "message": "Single data fetch", "data": serializer.data}
        return Response(dict_response)

    def update(self, request, pk=None):
        queryset = CompanyBank.objects.all()
        companybank = get_object_or_404(queryset, pk=pk)
        serializer = CompanyBankSerializer(
            companybank, data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        dict_response = {"error": False,
                         "message": "Company bank data updated successfully"}
        return Response(dict_response)


class CompanyNameViewset(generics.ListAPIView):
    serializer_class = CompanySerializer

    def get_queryset(self):
        name = self.kwargs['name']
        return Company.objects.filter(name=name)


class CompanyOnlyViewset(generics.ListAPIView):
    serializer_class = CompanySerializer

    def get_queryset(self):
        return Company.objects.all()


class MedicineViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        try:
            serializer = MedicineSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            # Adding and saving id for medicine details
            medicine_id = serializer.data['id']
            medicine_details_list = []
            for medicine_detail in request.data["medicine_details"]:
                medicine_detail["medicine_id"] = medicine_id
                medicine_details_list.append(medicine_detail)

            print(medicine_details_list)
            serializer2 = MedicalDetailsSerializer(
                data=medicine_details_list, many=True, context={"request": request})
            serializer2.is_valid()
            serializer2.save()

            dict_response = {"error": False,
                             "message": "Medicine data saved successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error during saving medicine data"}
        return Response(dict_response)

    def list(self, request):
        medicine = Medicine.objects.all()
        serializer = MedicineSerializer(
            medicine, many=True, context={'request': request})

        medicine_data = serializer.data
        newmedicinelist = []
        # Adding extra key for medicine details in medicine
        for medicine in medicine_data:
            medicine_detail = MedicalDetails.objects.filter(
                medicine_id=medicine["id"])
            medicine_detail_serializer = MedicalDetailsSerializerSimple(
                medicine_detail, many=True)
            medicine["medicine_details"] = medicine_detail_serializer.data
            newmedicinelist.append(medicine)

        response_dict = {
            "error": False, "message": "All Medicines List Data", "data": serializer.data}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        queryset = Medicine.objects.all()
        medicine = get_object_or_404(queryset, pk=pk)
        serializer = MedicineSerializer(medicine, context={"request": request})
        dict_response = {"error": False,
                         "message": "Single data fetch", "data": serializer.data}

        serializer_data = serializer.data
        medicine_detail = MedicalDetails.objects.filter(
            medicine_id=serializer_data["id"])
        medicine_detail_serializer = MedicalDetailsSerializerSimple(
            medicine_detail, many=True)
        serializer_data["medicine_details"] = medicine_detail_serializer.data
        return Response(dict_response)

    def update(self, request, pk=None):
        queryset = Medicine.objects.all()
        medicine = get_object_or_404(queryset, pk=pk)
        serializer = MedicineSerializer(
            medicine, data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        dict_response = {"error": False,
                         "message": "Medicine data updated successfully"}
        return Response(dict_response)


company_list = CompanyViewSet.as_view({"get": "list"})
company_create = CompanyViewSet.as_view({"post": "create"})
company_update = CompanyViewSet.as_view({"put": "update"})
