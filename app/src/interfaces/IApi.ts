import { IAuth } from "./IAuth";
import IUser from "./IUser";

export interface IApi {
  getUser: () => Promise<{data: IUser}>
  createUser: (user: IUser) => Promise<{data: IUser}>
}