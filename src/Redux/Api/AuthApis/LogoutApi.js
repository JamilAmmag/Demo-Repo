import http from "../http";
import localforage from "localforage";

const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
export default class Logout {
  static async LogoutApi(body) {
    localforage.clear();
    localStorage.clear();
    console.clear();
    await delay(1000)
    window.location.replace("/connectwallet");
    // hisotry.pust("/connectwallet");

    //return http.get(httpUrl + "/api/v1/auth/connect", body);
  }
}
