export default interface IGlobalParameters {
  serverId: string
  channelId: {get:string, set:React.Dispatch<React.SetStateAction<string>>}
}