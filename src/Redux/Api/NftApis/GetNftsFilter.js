import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetNftsFilter {
  static GetNftsFilterApi(body) {
    return http.post(httpUrl + "/api/v1/Nft/GetMarketPlaceNftSearch", body);
  }
}
