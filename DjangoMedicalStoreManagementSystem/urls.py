from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from DjangoMedicalApp import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from DjangoMedicalApp.views import CompanyNameViewset, CompanyOnlyViewset

router = routers.DefaultRouter()
router.register("company", views.CompanyViewSet, basename="company")
router.register("companybank", views.CompanyBankViewset,
                basename="companybank")
router.register("medicine", views.MedicineViewset, basename="medicine")
router.register("companyaccount", views.CompanyAccountViewset,
                basename="companyaccount")
router.register("employee", views.EmployeeViewset, basename="employee")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/gettoken/', TokenObtainPairView.as_view(), name='gettoken'),
    path('api/refresh_token/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api/companybyname/<str:name>/',
         CompanyNameViewset.as_view(), name='companybyname'),
    path('api/companyonly/', CompanyOnlyViewset.as_view(), name='companyonly'),
]
