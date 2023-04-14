import IChat from "./IChat";
import IUser from "./IUser";

export default interface IChatJointWithUser {
  chat: IChat;
  receiver: IUser;
  unreadMessages: number;
}