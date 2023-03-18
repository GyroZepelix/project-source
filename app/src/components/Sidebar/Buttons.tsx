import { FiLogOut, FiUserPlus, FiSettings, FiUser } from "react-icons/fi"
import { RiSettings5Fill } from "react-icons/ri"
import IMenuButton from "../../interfaces/IMenuButtons"



const menuIconProps = {
  className: 'text-lg'
}

const footerIconProps = {
  className: 'text-2xl opacity-70'
}

export const menuButtons:IMenuButton[] = [
  {
    name: 'Invite People',
    onClick: () => {
      console.log('Invite')
    },
    icon: <FiUserPlus {...menuIconProps}/>,
    color: 'highlight-2'
  },
  {
    name: 'Server Settings',
    onClick: () => {
      console.log('Settings')
    },
    icon: <FiSettings {...menuIconProps}/>,
    underline: true,
  },
  {
    name: 'Leave',
    onClick: () => {
      console.log('Leave')
    },
    icon: <FiLogOut {...menuIconProps}/>,
    color: 'red-500'
  },
]

export const footerButtons:IMenuButton[] = [
  {
    name: 'Settings',
    onClick: () => {
      console.log('Settings')
    },
    icon: <RiSettings5Fill {...footerIconProps}/>,
  }
]