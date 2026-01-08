import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

export default function BottomNav() {
    const items = [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/quiz-setup', label: 'Quiz', icon: '🧠' },
        { path: '/vocabularies', label: 'Vocabs', icon: '📚' },
        // { path: '/create', label: 'Add', icon: '➕' },
    ];

    return (
        // <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md"> <ul className="flex justify-around py-2">
        //     {items.map((item) => (
        //         <NavLink
        //             key={item.name}
        //             to={item.to}
        //             className={({ isActive }) =>
        //                 `flex flex-col items-center ${isActive ? "text-blue-600" : "text-gray-600"
        //                 }`
        //             }
        //         >
        //             <item.icon className="w-6 h-6" /> <span className="text-xs">{item.name}</span> </NavLink>
        //     ))} </ul> </nav>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 px-4 z-50">
            {items.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400'
                        }`
                    }
                >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
