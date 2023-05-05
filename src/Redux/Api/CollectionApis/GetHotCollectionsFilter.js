import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetHotCollections {
  static GetHotCollectionsFilterApi(pagesize,body) {
    return http.post(
      httpUrl + "/api/v1/Nft/GetHotCollectionsFilter?PageSize=9&CurrentPage="+pagesize, body
    );
  }
}
