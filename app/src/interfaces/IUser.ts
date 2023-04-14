import IUserKey from "./IUserKey";

export default interface IUser {
  email: string;
  userKey: IUserKey;
  imagePath: string;
  createdAt: Date;
}