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
}

export default APIHandler;
