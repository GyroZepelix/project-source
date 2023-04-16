import { AxiosResponse } from "axios";
import IUser from "./IUser";

export interface IApi {
  getUser: () => Promise<{data: IUser}>
  createUser: (user: IUser) => Promise<{data: IUser}>

  createChannel: (withUser: string) => Promise<AxiosResponse<any, any>>
}