import { Outlet } from 'react-router'
import Navbar from '../components/navbar'
import BottomNav from '../components/bottomNavbar'

function Layout() {
  return (
    <div>
    {/* <Navbar className="" />
      <main className="pt-20"> */}
      <div className="flex flex-col min-h-screen bg-slate-50">
      <main className="flex-grow pb-20">
        <Outlet />
        </main>
        </div>
      {/* </main> */}
      <BottomNav />
    </div>
  )
}

export default Layout