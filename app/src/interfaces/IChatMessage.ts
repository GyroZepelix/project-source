import IUserKey from "./IUserKey";

export default interface IChatMessage {
  chatId: string;
  messageTime: string;
  content: string;
  senderEmail: string;
  senderIconPath: string;
  senderUserKey: IUserKey;
}