import IUser from "./IUser";

export default interface IChatMessage {
  chatId: string;
  messageTime: string;
  content: string;
  senderEmail: string;
  senderIconPath: string;
  senderUserKey: IUser;
}