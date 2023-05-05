import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetAllCollectionsByCatgoriesIds {
  static GetAllCollectionsByCatgoriesIds(pagesize,body,search) {
    return http.post(
      httpUrl +
        "/api/v1/Nft/GetAllCollectionsByCatgoriesIds?PageSize=9&CurrentPage="+pagesize+"&search="+search, body
    );
  }
}


