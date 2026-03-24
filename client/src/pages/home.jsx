import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useVocabularyContext } from "../context/vocabularyContext";
import ConfirmModal from "../components/confirmModal";
import { useCollectionContext } from "../context/collectionContext";

export default function Home() {

    const { vocabularies } = useVocabularyContext();
    const { collections, collection, setCollection, createCollection, fetchCollections } = useCollectionContext();
    const [activeTab, setActiveTab] = useState('words');
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [isAddingCol, setIsAddingCol] = useState(false);
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all'); // 'all' | 'favorites'

    const filteredWords = vocabularies
        .filter(v => filter === 'favorites' ? v.isFavorite : true)
        .filter(v =>
            v.word.toLowerCase().includes(search.toLowerCase()) ||
            v.definition.toLowerCase().includes(search.toLowerCase())
        );

   

    const handleCreateCollection = (e) => {
        e.preventDefault();
        if (!collection.name) return;
        createCollection(e);
        setIsAddingCol(false);
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    

    return (
        <div className="p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-black text-slate-900 mb-4">Library</h1>
                <div className="flex bg-slate-100 p-1 rounded-2xl w-full">
                    <button
                        onClick={() => setActiveTab('words')}
                        className={`flex-grow py-3 cursor-pointer rounded-xl font-bold transition-all ${activeTab === 'words' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        All Words
                    </button>
                    <button
                        onClick={() => setActiveTab('collections')}
                        className={`flex-grow py-3 cursor-pointer rounded-xl font-bold transition-all ${activeTab === 'collections' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        Collections
                    </button>
                </div>
            </header>

            {activeTab === 'words' ? (
                <>
                    <div className="relative mb-3">
                        <span className="absolute left-4 top-3 text-slate-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search library..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            // disabled={isLoading}
                        />
                    </div>

                    <div className="flex space-x-2 mb-3">
                     <button
                         onClick={() => setFilter('all')}
                         className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${filter === 'all' ? 'bg-[#1a1a2e] text-white' : 'bg-white text-[#8a8a99] border border-[#e8e6e0]'}`}
                     >
                         All Words
                     </button>
                     <button
                         onClick={() => setFilter('favorites')}
                         className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${filter === 'favorites' ? 'bg-[#1a1a2e] text-white' : 'bg-white text-[#8a8a99] border border-[#e8e6e0]'}`}
                     >
                         ❤️ Favorites
                     </button>
                 </div>
                    
                
                    <div className="grid grid-cols-1 gap-4 pb-20">
                        {filteredWords.map((v) => (
                            <div
                                key={v.id}
                                onClick={() => navigate(`/vocabularies/${v.id}`)}
                                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 transition-all cursor-pointer group shadow-sm flex items-center justify-between"
                            >
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-lg font-bold text-slate-800">{v.word}</h3>
                                        {v.isFavorite && <span className="text-xs">❤️</span>}
                                    </div>
                                    <p className="text-slate-400 text-sm line-clamp-1">{v.definition}</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setDeletingId(v.id); }}
                                    className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-all"
                                >
                                    🗑️
                                </button>
                              
                            </div>
                        ))}
                        {filteredWords.length === 0 && (
                            <button
                                onClick={() => navigate('/vocabularies/create')}
                                className="h-40 cursor-pointer border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all bg-white/50"
                            >
                                <span className="text-3xl mb-2">➕</span>
                                <span className="font-bold text-xs uppercase tracking-widest">Add First Word</span>
                            </button>
                        )}
                          <button
            onClick={() => navigate('/vocabularies/create')}
            className="fixed bottom-24 right-6 w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-indigo-300 hover:bg-indigo-700 hover:scale-110 active:scale-90 transition-all z-40"
            aria-label="Add new word"
          >
            <span className="text-3xl font-light">＋</span>
          </button>
                    </div>
                </>
            ) : (
                <div className="grid grid-cols-2 gap-4 pb-20">
                    <button
                        onClick={() => setIsAddingCol(true)}
                        className="h-40 cursor-pointer border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all bg-white/50"
                    >
                        <span className="text-3xl mb-2">➕</span>
                        <span className="font-bold text-xs uppercase tracking-widest">New Collection</span>
                    </button>

                    {collections.map((col) => {
                        const count = vocabularies.filter(v => v.collection_id === col.id).length;
                        return (
                            <div
                                key={col.id}
                                onClick={() => navigate(`/collections/${col.id}`)}
                                className="h-40 bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer relative group"
                            >
                                <div className="text-3xl">{col.emoji}</div>
                                <div>
                                    <h3 className="font-black text-slate-800 leading-tight mb-1">{col.name}</h3>
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{count} Words</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); if (confirm('Delete collection? Words will remain in your library.')) onDeleteCollection(col.id); }}
                                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-xs p-1 hover:bg-red-50 rounded text-slate-300"
                                >
                                    ✕
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create Collection Modal */}
            {isAddingCol && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-200">
                        <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Create Collection</h3>
                        <form onSubmit={handleCreateCollection} className="space-y-4">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={collection.emoji}
                                    onChange={(e) => setCollection({ ...collection, emoji: e.target.value })}
                                    placeholder="Emoji"
                                    className="w-16 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xl"
                                />
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    value={collection.name}
                                    onChange={(e) => setCollection({ ...collection, name: e.target.value })}
                                    placeholder="Collection Name"
                                    className="flex-grow p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
                                />
                            </div>
                            <textarea
                                value={collection.description}
                                onChange={(e) => setCollection({ ...collection, description: e.target.value })}
                                placeholder="Brief description (optional)"
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm min-h-[100px]"
                            />
                            <div className="flex flex-col space-y-3 pt-2">
                                <button type="submit" className="cursor-pointer w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100">Create</button>
                                <button type="button" onClick={() => setIsAddingCol(false)} className="cursor-pointer w-full py-4 text-slate-500 font-bold">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={!!deletingId}
                title="Delete Word?"
                message="This will remove the word from all collections and your library."
                onConfirm={() => { if (deletingId) onDeleteVocab(deletingId); setDeletingId(null); }}
                onCancel={() => setDeletingId(null)}
            />
        </div>
    );
}
