import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/authContext';
import { useVocabularyContext } from '../context/vocabularyContext';
import { useNavigate } from 'react-router';
// import supabase from '../supabaseClient';

function Home() {
    const { vocabularies } = useVocabularyContext();
    const navigate = useNavigate();

    // const getVocabularies = async () => {
    //     const { data, error } = await supabase
    //         .from('vocabularies')
    //         .select('*');
    //     setVocabularies(data);
    // }

    //  useEffect(() => {
    //     getVocabularies();
    // }, []);
    // const vocabularies = [
    //     { id: 1, word: 'Serendipity', definition: 'The occurrence of events by chance in a happy or beneficial way', isFavorite: true },
    //     { id: 2, word: 'Ephemeral', definition: 'Lasting for a very short time', isFavorite: false },
    //     { id: 3, word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', isFavorite: true },
    //     { id: 4, word: 'Procrastinate', definition: 'To delay or postpone something', isFavorite: false },
    // ];

    if (vocabularies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full pt-20 px-6 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Feed is empty</h2>
                <p className="text-slate-500 mb-6">Add some new words to start your learning journey.</p>
                <button
                    onClick={() => navigate('/create')}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-100"
                >
                    Add First Word
                </button>
            </div>
        );
    }

    return (
        <div className="snap-container no-scrollbar">
            {vocabularies.map((vocab, index) => (
                <div key={vocab.id} className="snap-item w-full relative overflow-hidden bg-slate-900">
                    {/* Background Gradient/Pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500 rounded-full blur-[120px]" />
                    </div>

                    {/* Main Card */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 z-10 text-white">
                        <div
                            className="text-center cursor-pointer group"
                            onClick={() => navigate(`/details/${vocab.id}`)}
                        >
                            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight group-hover:scale-105 transition-transform duration-300">
                                {vocab.word}
                            </h2>
                            <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-indigo-300 text-sm font-bold uppercase tracking-widest mb-8">
                                {vocab.partOfSpeech || 'Unknown Type'}
                            </div>
                            <p className="text-xl md:text-2xl font-light text-slate-300 max-w-md leading-relaxed">
                                "{vocab.definition}"
                            </p>
                        </div>

                        {/* Action Overlay - Moved to bottom right and made smaller */}
                        <div className="absolute right-6 bottom-10 flex flex-col space-y-4 items-center">
                            <button
                                // onClick={() => onToggleFavorite(vocab.id)}
                                className={`flex flex-col items-center space-y-1 group`}
                            >
                                <div className={`p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-all ${vocab.isFavorite ? 'bg-red-500/80 text-white' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
                                    <span className="text-lg">{vocab.isFavorite ? '❤️' : '🤍'}</span>
                                </div>
                                <span className="text-[9px] font-bold opacity-70">Like</span>
                            </button>

                            <button
                                // onClick={() => navigate(`/edit/${vocab.id}`)}
                                className="flex flex-col items-center space-y-1 group"
                            >
                                <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white group-hover:bg-white/20 transition-all">
                                    <span className="text-lg">✏️</span>
                                </div>
                                <span className="text-[9px] font-bold opacity-70">Edit</span>
                            </button>

                            <button
                                // onClick={() => {
                                //   if (confirm("Delete this word?")) onDelete(vocab.id);
                                // }}
                                className="flex flex-col items-center space-y-1 group"
                            >
                                <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white group-hover:bg-red-500/40 transition-all">
                                    <span className="text-lg">🗑️</span>
                                </div>
                                <span className="text-[9px] font-bold opacity-70">Delete</span>
                            </button>
                        </div>

                        {/* Footer Text */}
                        <div className="absolute bottom-10 left-8">
                            <p className="text-slate-400 text-xs opacity-60 font-medium">Swipe up for next word</p>
                            <div className="flex space-x-1 mt-2">
                                <div className="w-4 h-1 bg-indigo-500 rounded-full"></div>
                                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;