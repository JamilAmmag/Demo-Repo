import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetMyAllCollections {
  static GetMyAllCollectionsApi(body) {
    return http.post(
      httpUrl + "/api/v1/Nft/GetMyAllCollections", body
    );
  }
}
