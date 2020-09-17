import AuthHandler from "./AuthHandler";
import Axios from "axios";
import Config from "./Config";

class APIHandler {
  async checkLogin() {
    if (AuthHandler.checkTokenExpiry) {
      var response = await Axios.post(Config.refreshApiUrl, {
        refresh: AuthHandler.getRefreshToken(),
      });
      console.log(response);
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
    this.checkLogin();
  }
}

export default APIHandler;
