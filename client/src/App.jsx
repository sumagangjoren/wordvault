'use client'
import Layout from "./layouts/layout"
import AuthLayout from "./layouts/authlayout"
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router'
import Login from "./pages/login"
import Home from "./pages/home"
import About from "./pages/about"
import SignUp from "./pages/signup"
import CreateVocabulary from "./pages/createVocabulary"
import ShowVocabulary from "./pages/showVocabulary"
import EditVocabulary from "./pages/editVocabulary"
import Vocabularies from "./pages/vocabularies"
import Quiz from "./pages/quiz"
import Result from "./pages/result"

function App() {

    const routes = createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route path="" index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="create" element={<CreateVocabulary />} />
                <Route path="show" element={<ShowVocabulary />} />
                <Route path="edit" element={<EditVocabulary />} />
                <Route path="vocabularies" element={<Vocabularies />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="result" element={<Result />} />
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
