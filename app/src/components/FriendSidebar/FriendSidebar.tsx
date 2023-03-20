import { footerButtons } from "../Sidebar/Buttons"
import SidebarFooter from "../Sidebar/SidebarFooter"
import SidebarHeader from "../Sidebar/SidebarHeader/SidebarHeader"
import DirectMessages from "./DirectMessages/DirectMessages"

const tempImage = "https://cdn.eso.org/images/screen/eso1907a.jpg"

const FriendSidebar = () => {
  return (
    <div className='min-w-[256px] flex flex-col justify-between h-full w-64 bg-primary-500'>
      <DirectMessages />
      <SidebarFooter buttons={footerButtons} />
    </div>
  )
}

export default FriendSidebar