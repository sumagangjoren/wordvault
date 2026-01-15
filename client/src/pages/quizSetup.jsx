
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVocabularyContext } from '../context/vocabularyContext';
import { useCollectionContext } from '../context/collectionContext';

export default function QuizSetup() {

    const { vocabularies } = useVocabularyContext();
    const { collections } = useCollectionContext();
    const [selectedCollectionId, setSelectedCollectionId] = useState('all');
    // const vocabCount = vocabularies.length;
    const quizType = {
        WORD_TO_DEFINITION: 'WORD_TO_DEFINITION',
        DEFINITION_TO_WORD: 'DEFINITION_TO_WORD',
    };

    const currentCount = selectedCollectionId == 'all' ? vocabularies.length : vocabularies.filter(v => v.collection_id == selectedCollectionId).length;


    const [type, setType] = useState(quizType.WORD_TO_DEFINITION);
    const navigate = useNavigate();

    const handleStart = () => {
        console.log('Starting quiz with type:', type, 'and collection ID:', selectedCollectionId);
        navigate('/quiz/play', { state: { type, collection_id: selectedCollectionId == "all" ? undefined : selectedCollectionId} });
    };

    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center mb-10">
                <div className="text-6xl mb-6">🧠</div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Memory Challenge</h1>
                <p className="text-slate-500">Test your knowledge of the words you've collected.</p>
            </div>

            <div className="w-full max-w-md space-y-4 mb-10">
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Quiz Type</h2>
                <button
                    onClick={() => setType(quizType.WORD_TO_DEFINITION)}
                    className={`w-full p-6 rounded-3xl border-2 cursor-pointer transition-all text-left flex items-center justify-between ${type === quizType.WORD_TO_DEFINITION ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'
                        }`}
                >
                    <div>
                        <h3 className="font-bold text-slate-900">Word → Meaning</h3>
                        <p className="text-sm text-slate-500">See a word, pick the right definition.</p>
                    </div>
                    {type === quizType.WORD_TO_DEFINITION && <span className="text-indigo-600 font-bold">✓</span>}
                </button>

                <button
                    onClick={() => setType(quizType.DEFINITION_TO_WORD)}
                    className={`w-full p-6 rounded-3xl border-2 cursor-pointer transition-all text-left flex items-center justify-between ${type === quizType.DEFINITION_TO_WORD ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'
                        }`}
                >
                    <div>
                        <h3 className="font-bold text-slate-900">Meaning → Word</h3>
                        <p className="text-sm text-slate-500">Read the meaning, pick the word.</p>
                    </div>
                    {type === quizType.DEFINITION_TO_WORD && <span className="text-indigo-600 font-bold">✓</span>}
                </button>
                    </section>

                <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Pick Collection</h2>
            <div className="flex overflow-x-auto no-scrollbar space-x-3 pb-2">
                <button 
                onClick={() => setSelectedCollectionId('all')}
                className={`flex-shrink-0 px-6 py-4 rounded-2xl border-2 transition-all ${
                    selectedCollectionId === 'all' ? 'border-indigo-600 bg-indigo-50 font-bold' : 'border-slate-100 bg-white'
                }`}
                >
                🌐 All Words
                </button>
                {collections.map(col => (
                <button 
                    key={col.id}
                    onClick={() => setSelectedCollectionId(col.id)}
                    className={`flex-shrink-0 px-6 py-4 rounded-2xl border-2 transition-all ${
                    selectedCollectionId === col.id ? 'border-indigo-600 bg-indigo-50 font-bold' : 'border-slate-100 bg-white'
                    }`}
                >
                    {col.emoji} {col.name}
                </button>
                ))}
            </div>
            </section>
            </div>

            

            <div className="w-full max-w-md">
                <button
                    onClick={handleStart}
                    disabled={currentCount < 4}
                    className="w-full bg-indigo-600 text-white font-black cursor-pointer py-5 rounded-2xl shadow-xl shadow-indigo-100 disabled:opacity-50 transition-all active:scale-95"
                >
                    {/* {vocabCount < 4 ? `Need ${4 - vocabCount} more words` : 'Start Quiz'} */}
                    {currentCount < 4 ? `Add ${4 - currentCount} more words to start` : 'Start Challenge'}
                </button>
                <p className="text-center mt-4 text-xs text-slate-400">
                    We'll pick 10 random words from your library.
                </p>
            </div>
        </div>
    );
};

