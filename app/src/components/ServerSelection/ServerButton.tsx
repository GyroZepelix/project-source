import { FC } from "react"

interface IProps {
  selected?: boolean
  image?: string
  name?: string
  serverId?: string,
  onClick?: (serverId:string) => any
}

const ServerButton:FC<IProps> = ({selected, image="", name="", serverId="", onClick=()=>{}}) => {
  return (
    <div className=" bg-primary-1000 rounded-full overflow-hidden cursor-pointer" onClick={() => onClick(serverId)}>
      <img className="object-cover w-[50px] h-[50px] pointer-events-none select-none" src={image} alt={name} />
    </div>
  )
}

export default ServerButton