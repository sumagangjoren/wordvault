import { Outlet } from 'react-router'
import Navbar from '../components/navbar'
import BottomNav from '../components/bottomNavbar'

function Layout() {
  return (
    <div>
        <Navbar className=""/>
        <main className="pt-20">
        <Outlet />
      </main>
        <BottomNav />
    </div>
  )
}

export default Layout