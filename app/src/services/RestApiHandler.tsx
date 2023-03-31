import { IApi } from "../interfaces/IApi";

const SPRING_API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/`

export class RestApiHandler {
  API: IApi
  
  constructor (API:IApi) {
    this.API = API
  }
}