import { Outlet } from 'react-router'
import Navbar from '../components/navbar'
import BottomNav from '../components/bottomNavbar'

function Layout() {
  return (
    <div>
        <Navbar className="mb-8"/>
        <Outlet/>
        <BottomNav />
    </div>
  )
}

export default Layout