'use client'
import Layout from "./layouts/layout"
import AuthLayout from "./layouts/authlayout"
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router'
import Login from "./pages/login"
import Home from "./pages/home"
import About from "./pages/about"
import Words from "./pages/words"
import Word from "./pages/word"
import SignUp from "./pages/signup"

function App() {

    const routes = createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route path="" index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="words" element={<Words />} />
                
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </>
    );

    const router = createBrowserRouter(routes);


    return (
        <>
            {/* <Routes>
                <Route element={<Navbar />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/words" element={<Words />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes> */}
            <RouterProvider router={router} />
        </>
    )
}

export default App
