import IChatMessage from "./IChatMessage";
import IUser from "./IUser";

export default interface IMessageJointWithUser {
  sender: IUser;
  message: IChatMessage;
}