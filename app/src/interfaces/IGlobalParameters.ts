import { Client } from "@stomp/stompjs"
import { RestApiHandler } from "../services/RestApiHandler"
import { IAuth } from "./IAuth"
import IChatMessage from "./IChatMessage"
import IUser from "./IUser"
import IChatJointWithUser from "./IChatJointWithUser"

export default interface IGlobalParameters {
  serverId: string
  channelId: string
  stompClient: Client | undefined
  auth: IAuth | undefined
  HANDLER: RestApiHandler
  privateChatsById: { get: Map<string, IChatJointWithUser>, set: React.Dispatch<React.SetStateAction<Map<string, IChatJointWithUser>>>},
}