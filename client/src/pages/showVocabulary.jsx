
import { useNavigate, useParams } from "react-router-dom";
import { useVocabularyContext } from "../context/vocabularyContext";

export default function ShowVocabulary() {

    const { vocabularies } = useVocabularyContext();
    const { vocabulary_id } = useParams();
    const navigate = useNavigate();
    console.log(vocabularies)
    const vocab = vocabularies.find(v => v.id == vocabulary_id);
    console.log(vocabulary_id)
    console.log(vocab)
    if (!vocab) {
        return <div className="p-10 text-center">Word not found.</div>;
    }


    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="relative h-64 bg-indigo-600 flex items-center justify-center p-6 text-white overflow-hidden">
                <div className="absolute top-4 left-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
                    >
                        <span className="text-xl">←</span>
                    </button>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                        onClick={() => onToggleFavorite(vocab.id)}
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
                    >
                        <span className="text-xl">{vocab.isFavorite ? '❤️' : '🤍'}</span>
                    </button>
                    <button
                        onClick={() => navigate(`/vocabularies/${vocab.id}/edit`)}
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
                    >
                        <span className="text-xl">✏️</span>
                    </button>
                </div>

                {/* Backdrop Visual */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl"></div>
                </div>

                <div className="text-center z-10">
                    <h1 className="text-5xl font-black tracking-tight">{vocab.word}</h1>
                    {vocab.partOfSpeech && (
                        <p className="text-indigo-200 text-sm font-bold uppercase tracking-[0.2em] mt-2 opacity-80">
                            {vocab.partOfSpeech}
                        </p>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-10 -mt-10 bg-white rounded-t-[40px] relative z-20">
                <section className="mb-10">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Definition</h2>
                    <p className="text-2xl font-semibold text-slate-800 leading-tight">
                        {vocab.definition}
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Example Usage</h2>
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl italic text-slate-700 text-lg leading-relaxed relative">
                        <span className="absolute -top-4 -left-1 text-4xl text-indigo-200">“</span>
                        {vocab.example}
                        <span className="absolute -bottom-8 -right-1 text-4xl text-indigo-200">”</span>
                    </div>
                </section>

                {vocab.notes && (
                    <section className="mb-10">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Notes & Synonyms</h2>
                        <p className="text-slate-600 bg-amber-50 p-4 rounded-2xl border border-amber-100 italic">
                            {vocab.notes}
                        </p>
                    </section>
                )}

                <div className="pt-10 border-t border-slate-100">
                    <button
                        onClick={() => {
                            if (confirm("Permanently delete this word?")) onDelete(vocab.id);
                        }}
                        className="w-full py-4 text-red-500 font-bold border-2 border-red-50 rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
                    >
                        <span>🗑️</span>
                        <span>Delete from Library</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
