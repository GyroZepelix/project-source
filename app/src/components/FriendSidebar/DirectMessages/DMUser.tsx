import { FC } from "react"

interface IProps {
  name: string,
  image: string,
  onClick?: () => void
}

const DMUser:FC<IProps> = ({name, image, onClick=()=>{}}) => {
  return (
    <div className="group p-1.5 flex justify-left gap-2 items-center select-none hover:bg-primary-750 my-0.5" onClick={onClick}>
      <img src={image} className="h-8 w-8 pointer-events-none" alt="" />
      <p className="group-hover:opacity-100 opacity-70">{name}</p>
    </div>
  )
}

export default DMUser