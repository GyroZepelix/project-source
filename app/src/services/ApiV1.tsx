import axios from "axios";
import { IApi } from "../interfaces/IApi";
import { IAuth } from "../interfaces/IAuth";
import IUser from "../interfaces/IUser";
import ApiWithKeycloak from "./ApiWithKeycloak";


export class ApiV1 extends ApiWithKeycloak implements IApi {
  private readonly _baseUrl: string;

  constructor(baseUrl: string, auth: IAuth) {
    super(auth);
    this._baseUrl = `${baseUrl}/api`;
  }

  getUser = () => {return axios.get(`${this._baseUrl}/userByEmail`, this.buildConfig())}

  createUser = (user: IUser) => {return axios.post(`${this._baseUrl}/userByEmail`, user, this.buildConfig())}

}