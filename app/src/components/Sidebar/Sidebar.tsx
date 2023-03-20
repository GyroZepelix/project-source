import { footerButtons } from './Buttons'
import SidebarFooter from './SidebarFooter'
import SidebarHeader from './SidebarHeader/SidebarHeader'

const tempImage = "https://cdn.eso.org/images/screen/eso1907a.jpg"

const Sidebar = () => {
  return (
    <div className='min-w-[256px] flex flex-col justify-between h-full w-64 bg-primary-500'>
      <div>
        <SidebarHeader banner={tempImage} serverName='Testicles'/>
        <h1>test</h1>
      </div>
      <SidebarFooter buttons={footerButtons} />
    </div>
  )
}

export default Sidebar