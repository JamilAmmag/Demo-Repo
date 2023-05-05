import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetAllCollections {
  static GetAllCollcectionsApi(current) {
    return http.get(
      httpUrl +
        "/api/v1/Nft/GetAllCollections?PageSize=9&CurrentPage="+current
    );
  }
}


