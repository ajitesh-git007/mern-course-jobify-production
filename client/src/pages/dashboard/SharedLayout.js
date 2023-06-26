import { Outlet, Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, BigSidebar, SmallSidebar } from '../../components'

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
      <SmallSidebar/>
      <BigSidebar/>

      <div>
        <Navbar/>

        <div className="dashboard-page">
      <Outlet/>  {/*// In summary, <Outlet/> acts as a placeholder that dynamically renders the content of the nested route components based on the matched URL. It allows you to define a layout or container component and have the route-specific content rendered within it.*/}
      </div>

      </div>

      </main>
     
    </Wrapper>
  )
}

export default SharedLayout
