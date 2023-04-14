import { FC } from "react"

interface IProps {
  name: string,
  image: string,
  unreadMessages: number,
  selected?: boolean,
  onClick?: () => void
}

const DirectMessageUserButton:FC<IProps> = ({name, image, unreadMessages, selected=false, onClick=()=>{}}) => {
  
  
  return (
    <div className={`rounded-md group p-1.5 flex justify-left gap-2 items-center select-none hover:bg-primary-750 my-0.5 ${selected && 'bg-primary-1000 bg-opacity-80 hover:bg-opacity-100'}`} onClick={onClick}>
      <img src={image} className={`h-8 w-8 pointer-events-none rounded-full object-cover`} alt="" />
      <p className={`group-hover:text-main ${unreadMessages > 0 ? "text-main" : "text-mainGray"}`}>{name}</p>
    </div>
  )
}

export default DirectMessageUserButton