import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

export default function BottomNav() {
    const items = [
        { name: "Home", to: "/", icon: HomeIcon },
        { name: "Quiz", to: "/quiz", icon: MagnifyingGlassIcon },
        { name: "Vocabularies", to: "/vocabularies", icon: UserIcon },
    ];

    return (<nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md"> <ul className="flex justify-around py-2">
        {items.map((item) => (
            <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                    `flex flex-col items-center ${isActive ? "text-blue-600" : "text-gray-600"
                    }`
                }
            >
                <item.icon className="w-6 h-6" /> <span className="text-xs">{item.name}</span> </NavLink>
        ))} </ul> </nav>
    );
}
