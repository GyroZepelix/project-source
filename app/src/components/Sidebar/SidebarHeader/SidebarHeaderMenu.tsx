import React, { FC } from 'react'
import { IconType } from 'react-icons'
import {FiLogOut} from 'react-icons/fi'
import IMenuButton from '../../../interfaces/IMenuButtons'

interface IProps {
  buttons: IMenuButton[]
}


const SidebarHeaderMenu:FC<IProps> = ({buttons}) => {
  return (
    <menu className='flex flex-col gap-2 absolute p-2 bg-primary-0 rounded-md left-3 right-3 top-10 animate-grow-in origin-top'>
      {
        buttons.map((button) => (
          <div key={button.name}>
            <div className={`cursor-pointer text-sm flex justify-between items-center p-2 rounded-md hover:text-primary-250 ${button.color ? `text-${button.color} hover:bg-${button.color}` : "text-main text-opacity-80 hover:text-opacity-100 hover:bg-highlight-2 "}`} onClick={button.onClick}>
              <button>{button.name}</button>
              {button.icon}
            </div>
            {button.underline && <div key={button.name + "line"} className='h-[2px] w-full bg-primary-750' />}
          </div>))
      }

    </menu>
  )
}

export default SidebarHeaderMenu