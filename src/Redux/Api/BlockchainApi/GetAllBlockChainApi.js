import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetAllBlockChain {
  static GetAllBlockChainApi(body) {
    return http.get(
      httpUrl + "/api/v1/BlockChain/GetAllBlockChain"
   //  "https://fineoriginal-api.azurewebsites.net/api/v1/BlockChain/GetAllBlockChain"
     );
  }
}
