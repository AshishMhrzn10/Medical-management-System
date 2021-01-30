from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from DjangoMedicalApp import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf.urls.static import static
from django.conf import settings

from DjangoMedicalApp.views import CompanyNameViewset, CompanyOnlyViewset, MedicineByNameViewset

router = routers.DefaultRouter()
router.register("company", views.CompanyViewSet, basename="company")
router.register("companybank", views.CompanyBankViewset,
                basename="companybank")
router.register("medicine", views.MedicineViewset, basename="medicine")
router.register("companyaccount", views.CompanyAccountViewset,
                basename="companyaccount")
router.register("employee", views.EmployeeViewset, basename="employee")
router.register("employee_all_bank", views.EmployeeBankViewset, basename="employee_all_bank")
router.register("employee_all_salary", views.EmployeeSalaryViewset, basename="employee_all_salary")
router.register("generate_bill_api", views.GenerateBillViewSet, basename="generate_bill_api")
router.register("customer_request", views.CustomerRequestViewset, basename="customer_request")
router.register("home_api", views.HomeApiViewset, basename="home_api")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/gettoken/', TokenObtainPairView.as_view(), name='gettoken'),
    path('api/refresh_token/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api/companybyname/<str:name>/',CompanyNameViewset.as_view(), name='companybyname'),
    path('api/medicinebyname/<str:name>/',MedicineByNameViewset.as_view(), name='medicinebyname'),
    path('api/companyonly/', CompanyOnlyViewset.as_view(), name='companyonly'),
    path('api/employee_bankby_id/<str:employee_id>/', views.EmployeeBankByEIDViewset.as_view(), name='employee_bankby_id'),
    path('api/employee_salaryby_id/<str:employee_id>/', views.EmployeeSalaryByEIDViewset.as_view(), name='employee_salaryby_id'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)