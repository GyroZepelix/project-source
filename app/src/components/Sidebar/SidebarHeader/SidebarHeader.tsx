import { FC, useState } from "react"
import { FiChevronDown } from "react-icons/fi"
import { FiX } from "react-icons/fi"
import SidebarHeaderMenu from "./SidebarHeaderMenu"
import { menuButtons } from "../Buttons"

interface IProps {
  banner?: string
  serverName?: string
}

const SidebarHeader:FC<IProps> = ({banner="", serverName=""}) => {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={`flex flex-col w-full relative select-none items-center ${banner && 'h-40'}`}>
      { banner && <img className="pointer-events-none absolute w-full h-40" src={banner} alt="" />}
      <div className="flex justify-between items-center w-full relative">
        <h1 className="relative font-semibold text-stroke self-start my-2 ml-4">{serverName}</h1>
        {menuOpen && <SidebarHeaderMenu buttons={menuButtons} />}
        {menuOpen ?
          <FiX onClick={() => {setMenuOpen((open) => (!open))}} className="cursor-pointer relative text-main text-2xl mr-4" />
          :
          <FiChevronDown onClick={() => {setMenuOpen((open) => (!open))}} className="relative text-main text-2xl mr-4 cursor-pointer" />}
      </div>
      { !banner && <div className="w-full h-[2px] bg-primary-250" />} 
    </div>
  )
}

export default SidebarHeader