import { IApi } from "../interfaces/IApi";


export class RestApiHandler {
  API: IApi
  
  constructor (API:IApi) {
    this.API = API
  }
}