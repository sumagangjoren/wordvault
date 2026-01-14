import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { VocabularyContextProvider } from './context/vocabularyContext.jsx'
import { QuizContextProvider } from './context/quizContext.jsx'
import { CollectionContextProvider } from './context/collectionContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
                <CollectionContextProvider>
        <VocabularyContextProvider>
            <QuizContextProvider>
                    <App />
            </QuizContextProvider>
        </VocabularyContextProvider>
                </CollectionContextProvider>

    </AuthContextProvider>
)
