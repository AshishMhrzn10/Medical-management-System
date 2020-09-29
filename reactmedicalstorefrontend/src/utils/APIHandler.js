import AuthHandler from "./AuthHandler";
import Axios from "axios";
import Config from "./Config";
import { reactLocalStorage } from "reactjs-localstorage";

class APIHandler {
  async checkLogin() {
    if (AuthHandler.checkTokenExpiry) {
      try {
        var response = await Axios.post(Config.refreshApiUrl, {
          refresh: AuthHandler.getRefreshToken(),
        });

        reactLocalStorage.set("token", response.data.access);
      } catch (error) {
        console.log(error);

        //Not using valid toke for refresh then logout the user
        AuthHandler.logoutUser();
        window.location = "/";
      }
    }
  }

  async saveCompanyData(
    name,
    license_no,
    address,
    contact_no,
    email,
    description
  ) {
    await this.checkLogin();
    //wait until token get updated
    var response = await Axios.post(
      Config.companyApiUrl,
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchAllCompany() {
    await this.checkLogin();

    var response = await Axios.get(Config.companyApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async fetchAllCompanyAccount() {
    await this.checkLogin();

    var response = await Axios.get(Config.companyAccountApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async fetchCompanyDetails(id) {
    await this.checkLogin();

    var response = await Axios.get(Config.companyApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async editCompanyData(
    name,
    license_no,
    address,
    contact_no,
    email,
    description,
    id
  ) {
    await this.checkLogin();
    //wait until token get updated
    var response = await Axios.put(
      Config.companyApiUrl + "" + id + "/",
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );
    return response;
  }

  async saveCompanyBankData(bank_account_no, ifsc_no, company_id) {
    await this.checkLogin();
    //wait until token get updated
    var response = await Axios.post(
      Config.companyBankApiUrl,
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        company_id: company_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchCompanyBankDetails(id) {
    await this.checkLogin();

    var response = await Axios.get(Config.companyBankApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async editCompanyBankData(bank_account_no, ifsc_no, company_id, id) {
    await this.checkLogin();
    //wait until token get updated
    var response = await Axios.put(
      Config.companyBankApiUrl + "" + id + "/",
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        company_id: company_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchCompanyOnly() {
    await this.checkLogin();

    var response = await Axios.get(Config.companyOnly, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async saveMedicineData(
    name,
    medical_type,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    medicinedetails
  ) {
    await this.checkLogin();
    //Wait Until Token Get Updated

    var response = await Axios.post(
      Config.medicineApiUrl,
      {
        name: name,
        medical_type: medical_type,
        buy_price: buy_price,
        sell_price: sell_price,
        c_gst: c_gst,
        s_gst: s_gst,
        batch_no: batch_no,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock_total: in_stock_total,
        qty_in_strip: qty_in_strip,
        medicine_details: medicinedetails,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchAllMedicine() {
    await this.checkLogin();

    var response = await Axios.get(Config.medicineApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async editMedicineData(
    name,
    medical_type,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    medicinedetails,
    id
  ) {
    await this.checkLogin();
    //Wait Until Token Get Updated

    var response = await Axios.put(
      Config.medicineApiUrl + "" + id + "/",
      {
        name: name,
        medical_type: medical_type,
        buy_price: buy_price,
        sell_price: sell_price,
        c_gst: c_gst,
        s_gst: s_gst,
        batch_no: batch_no,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock_total: in_stock_total,
        qty_in_strip: qty_in_strip,
        medicine_details: medicinedetails,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );
    return response;
  }

  async saveCompanyTransactionData(
    company_id,
    transaction_type,
    transaction_amt,
    transaction_date,
    payment_mode
  ) {
    await this.checkLogin();
    //wait until token get updated
    var response = await Axios.post(
      Config.companyAccountApiUrl,
      {
        company_id: company_id,
        transaction_type: transaction_type,
        transaction_amt: transaction_amt,
        transaction_date: transaction_date,
        payment_mode: payment_mode,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchEmployee() {
    await this.checkLogin();

    var response = await Axios.get(Config.employeeApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async saveEmployeeData(name, joining_date, phone, address) {
    await this.checkLogin();
    //wait until token get updated
    var response = await Axios.post(
      Config.employeeApiUrl,
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );
    return response;
  }
}

export default APIHandler;
