import { FC } from "react"

interface IProps {
  name: string,
  image: string
}

const DMUser:FC<IProps> = ({name, image}) => {
  return (
    <div className="p-1.5 flex justify-left gap-2 items-center select-none hover:bg-primary-750 my-0.5">
      <img src={image} className="h-8 w-8 pointer-events-none" alt="" />
      <p className="gro">{name}</p>
    </div>
  )
}

export default DMUser