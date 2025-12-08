import { Outlet, NavLink } from "react-router"

const AuthLayout = () => {
    return (
        <div>
            <header className="">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <NavLink to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">TITLE </span>
                            <img
                                alt=""
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </NavLink>
                    </div>
                </nav>
            </header>
            <Outlet />
        </div>
    )
}

export default AuthLayout