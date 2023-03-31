import { Client } from "@stomp/stompjs"
import { RestApiHandler } from "../services/RestApiHandler"
import { IAuth } from "./IAuth"
import IChatMessage from "./IChatMessage"

export default interface IGlobalParameters {
  serverId: string
  channelId: {get:string, set:React.Dispatch<React.SetStateAction<string>>}
  stompClient: Client | undefined
  auth: IAuth | undefined
  HANDLER: RestApiHandler
}