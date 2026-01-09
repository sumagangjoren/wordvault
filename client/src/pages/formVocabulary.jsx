import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVocabularyContext } from "../context/vocabularyContext";

export default function FormVocabulary({ handleSubmit }) {

    const { vocabularies, vocabulary, setVocabulary, loading, errorMessage } = useVocabularyContext();
    const { id } = useParams();
    const editing = vocabularies?.find(v => v.id === id);
    const navigate = useNavigate();

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">{editing ? 'Edit Word' : 'New Word'}</h1>
                    <p className="text-slate-500">Capture and cultivate your language.</p>
                </div>
                <button onClick={() => navigate(-1)} className="text-slate-400 font-bold hover:text-slate-600">
                    ❌
                </button>
            </header>
                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                        {errorMessage}
                    </div>
                )}
            <form 
                onSubmit={handleSubmit} 
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
                            onChange={(e) => setVocabulary({...vocabulary, word: e.target.value})}
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

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Definition</label>
                    <textarea
                        required
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="What does it mean?"
                        value={vocabulary.definition}
                        onChange={(e) => setVocabulary({...vocabulary, definition: e.target.value})}
                    />
                </div>

                {/* <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Example Sentence</label>
                    <textarea
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all italic"
                        placeholder="Use it in a sentence..."
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                    />
                </div> */}

                <div className="pt-6">
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-lg"
                    >
                        {editing ? 'Save Changes' : 'Add to Collection'}
                    </button>
                </div>
            </form>
        </div>
    );

}