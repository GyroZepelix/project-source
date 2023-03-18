import { FC } from "react"
import { RiSettings5Fill } from "react-icons/ri"
import IMenuButton from "../../interfaces/IMenuButtons"

interface IProps {
  buttons: IMenuButton[]
}

const SidebarFooter:FC<IProps> = ({buttons}) => {
  return (
    <div className="flex justify-between py-1 px-2 bg-primary-250 items-center select-none">
      <div className="cursor-pointer flex grow gap-2 hover:bg-primary-1000 py-1 px-2 rounded-md">
        <img className="h-9 w-9 rounded-full bg-slate-400 pointer-events-none" src="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png" alt="" />
        <div className="flex flex-col text-xs justify-center">
          <p className="font-bold">Gyro</p>
          <p className="opacity-70">#1253</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 mx-1">
        {buttons.map((button) => (
          <div key={button.name} onClick={button.onClick} className="cursor-pointer hover:bg-primary-1000 p-1.5 rounded">
            {button.icon}
          </div>
        ))
        }
      </div>      
    </div>
  )
}

export default SidebarFooter