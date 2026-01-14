import { useNavigate, useParams } from "react-router-dom";
import { useVocabularyContext } from "../context/vocabularyContext";
import { useEffect } from "react";
import { useCollectionContext } from "../context/collectionContext";

export default function FormVocabulary({ handleSubmit }) {

    const { vocabularies, vocabulary, setVocabulary, errorMessage, } = useVocabularyContext();
    const { vocabulary_id } = useParams();
    const editing = vocabularies?.find(v => v.id == vocabulary_id);
    const { collections, fetchCollections } = useCollectionContext();

    useEffect(() => {
        if (editing) {
            setVocabulary({
                id: editing.id,
                word: editing.word || "",
                definition: editing.definition || "",
                partOfSpeech: editing.partOfSpeech || "",
                example: editing.example || "",
                collection_id: editing.collection_id || ''
            });
        }

        // 🧹 cleanup runs when user leaves the page
        return () => {
            setVocabulary({
                word: "",
                definition: "",
                partOfSpeech: "",
                example: "",
                collection_id: ""
            });
        };

    }, [editing, setVocabulary]);

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        // e.preventDefault();
        // setErrorMessage(null);
        try {
            handleSubmit(e);
            // navigate to home or details page
            navigate('/vocabularies'); // or navigate(`/vocabularies/${result.data.id}`)
        } catch (err) {
            //   setErrorMessage(err.message || 'Failed to create');
            console.error('Error submitting form:', err);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">{editing ? 'Edit Word' : 'New Word'}</h1>
                    <p className="text-slate-500">Capture and cultivate your language.</p>
                </div>
                <button onClick={() => navigate(-1)} className="text-slate-400 cursor-pointer font-bold hover:text-slate-600">
                    ❌
                </button>
            </header>
            {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                    {errorMessage}
                </div>
            )}
            <form
                onSubmit={handleFormSubmit}
                className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">The Word</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            required
                            className="flex-grow px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xl font-bold"
                            placeholder="e.g. Epiphany"
                            value={vocabulary.word}
                            onChange={(e) => setVocabulary({ ...vocabulary, word: e.target.value })}
                        // onBlur={handleEnrich}
                        />
                        {/* <button
                            type="button"
                            onClick={handleEnrich}
                            disabled={loadingAI || !word}
                            className="px-5 bg-indigo-100 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-200 transition-all disabled:opacity-50"
                        >
                            {loadingAI ? '...' : '✨ AI'}
                        </button> */}
                    </div>
                    <p className="text-xs text-slate-400">Type a word and wait a moment for AI suggestions!</p>
                </div>

                <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Collection</label>
                    <div className="flex overflow-x-auto no-scrollbar space-x-2 pb-1">
                        <button
                            type="button"
                            onClick={() => setVocabulary({ ...vocabulary, collection_id: '' })}
                            className={`flex-shrink-0 px-4 py-3 cursor-pointer rounded-xl border text-sm font-bold transition-all ${!vocabulary.collection_id ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-500'}`}
                        >
                            None
                        </button>
                        {collections.map(col => (
                            <button
                                key={col.id}
                                type="button"
                                // onClick={() => setCollectionId(col.id)}
                                onClick={(e) => setVocabulary({ ...vocabulary, collection_id: col.id })}
                                className={`flex-shrink-0 cursor-pointer px-4 py-3 rounded-xl border text-sm font-bold transition-all ${vocabulary.collection_id === col.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`}
                            >
                                {col.emoji} {col.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Definition</label>
                    <textarea
                        required
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="What does it mean?"
                        value={vocabulary.definition}
                        onChange={(e) => setVocabulary({ ...vocabulary, definition: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Example Sentence</label>
                    <textarea
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all italic"
                        placeholder="Use it in a sentence..."
                        value={vocabulary.example}
                        onChange={(e) => setVocabulary({ ...vocabulary, example: e.target.value })}
                    />
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        className="w-full bg-slate-900 cursor-pointer text-white font-black py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-lg"
                    >
                        {editing ? 'Save Changes' : 'Add to Collection'}
                    </button>
                </div>

            </form>
        </div>
    );

}