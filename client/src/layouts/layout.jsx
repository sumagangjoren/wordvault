import { Outlet } from 'react-router'
import Navbar from '../components/navbar'

function Layout() {
  return (
    <div>
        <Navbar className="mb-8"/>
        <Outlet/>
    </div>
  )
}

export default Layout