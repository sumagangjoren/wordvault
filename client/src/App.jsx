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
import PrivateRoute from "./components/privateRoute"
import PublicRoute from "./components/publicRoute"
// import EmailConfirmation from "./pages/emailConfirmation"
import QuizSetup from "./pages/quizSetup"
import QuizGame from "./pages/quizGame"
import FormVocabulary from "./pages/formVocabulary"
import Profile from "./pages/profile"
import { useVocabularyContext } from "./context/vocabularyContext"
import NotFound from "./pages/notFound404"

function App() {

    const { createVocabulary, updateVocabulary } = useVocabularyContext();

    const routes = createRoutesFromElements(
        <>
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route path="" index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="vocabularies/:vocabulary_id" element={<ShowVocabulary />} />
                    <Route path="vocabularies/create" element={<FormVocabulary handleSubmit={createVocabulary} />} />
                    <Route path="vocabularies/:vocabulary_id/edit" element={<FormVocabulary handleSubmit={updateVocabulary} />} />
                    <Route path="vocabularies" element={<Vocabularies />} />
                    <Route path="quiz" element={<Quiz />} />
                    <Route path="quiz/play" element={<QuizGame />} />
                    <Route path="quiz/setup" element={<QuizSetup />} />
                    <Route path="result" element={<Result />} />
                    <Route path="profile" element={<Profile />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Route> 
            </Route>
            <Route element={<PublicRoute />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    {/* <Route path="email-confirmation" element={<EmailConfirmation />} /> */}
                    
            </Route>
            <Route path="*" element={<NotFound />} />
        </>
    );

    const router = createBrowserRouter(routes);


    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
