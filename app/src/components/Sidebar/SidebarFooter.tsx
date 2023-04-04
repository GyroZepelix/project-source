import { useQuery } from "@tanstack/react-query"
import { FC, useContext } from "react"
import { RiSettings5Fill } from "react-icons/ri"
import { GlobalParametersContext } from "../../containers/ApplicationMain"
import IMenuButton from "../../interfaces/IMenuButtons"

interface IProps {
  buttons: IMenuButton[]
}

const SidebarFooter:FC<IProps> = ({buttons}) => {

  const globalParams = useContext(GlobalParametersContext)

  const userQuery = useQuery(
    {
      queryKey: ['user', 'me'],
      queryFn: globalParams.HANDLER.API.getUser,
    }
  )  

  
  if (userQuery.isLoading) {
    return <></>
  }
  
  if (userQuery.isError) {
    return <h1>Error?</h1>
  }

  const userData = userQuery.data.data

  return (
    <div className="flex justify-between py-1 px-2 bg-primary-250 items-center select-none">
      <div className="cursor-pointer flex grow gap-2 hover:bg-primary-1000 py-1 px-2 rounded-md">
        <img className="h-9 w-9 rounded-full bg-slate-400 pointer-events-none" src={userData.imagePath} alt="" />
        <div className="flex flex-col text-xs justify-center">
          <p className="font-bold">{userData.userKey.username}</p>
          <p className="opacity-70">#{userData.userKey.tag}</p>
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