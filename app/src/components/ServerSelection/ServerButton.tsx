import { FC } from "react"

interface IProps {
  selected?: boolean
  image?: string
  name?: string
  serverId?: string,
  unreadMessages?: number,
  onClick?: (serverId:string) => any
}

const dotOnHover = 'before:-translate-x-3.5 before:rounded-md before:top-0 before:transition-all before:h-3 before:my-auto before:bottom-0 hover:before:absolute hover:before:block before:w-2 hover:before:h-10 before:bg-main'


const ServerButton:FC<IProps> = ({selected=false, image="", name="", serverId="", unreadMessages, onClick=()=>{}}) => {
  
  
  return (
    <div className={`min-w-[49px] group ${selected && "before:block before:absolute "} ${dotOnHover} relative bg-primary-1000 rounded-full cursor-pointer`} onClick={() => onClick(serverId)}>
      <img className={`rounded-[25px] transition-[border-radius] group-hover:rounded-2xl ${selected && "!rounded-2xl"} object-cover w-[50px] h-[50px] pointer-events-none select-none`} src={image} alt={name} />
      {unreadMessages && <div className="absolute bg-red-500 text-main font-bold rounded-full text-xs text-center bottom-0 right-0 outline outline-2 outline-primary-0 flex justify-center items-center"><p className="py-[1px] px-[5px]">{unreadMessages}</p></div>}
    </div>
  )
}

export default ServerButton