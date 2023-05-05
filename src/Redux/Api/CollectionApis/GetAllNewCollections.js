import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetAllTodayCollections {
  static GetAllTodayCollectionsApi(pagesize,body) {
    return http.post(
      httpUrl + "/api/v1/Nft/GetAllTodayCollections?PageSize=9&CurrentPage="+pagesize, body
    );
  }
}
