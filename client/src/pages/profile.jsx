import { useAuthContext } from "../context/authContext";
import { useVocabularyContext } from "../context/vocabularyContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuizContext } from "../context/quizContext";

export default function Profile() {

    const { session, signOut } = useAuthContext();
    const { quizResults } = useQuizContext();
    const { vocabularies, resetVocabularyState } = useVocabularyContext();
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(session?.user?.name || 'temporary name');
    const navigate = useNavigate();
    const favorites = vocabularies.filter(v => v.isFavorite);
    const FAVORITES_LIMIT = 4;
    const HISTORY_LIMIT = 4;
    const [showAllFavs, setShowAllFavs] = useState(false);
    const [showAllHistory, setShowAllHistory] = useState(false);

    const handleLogout = () => {
        signOut();
        resetVocabularyState();
        navigate('/login');
    }

     const averageScore = quizResults.length > 0 
        ? Math.round((quizResults.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / quizResults.length) * 100)
        : 0;

    const displayedFavs = showAllFavs ? favorites : favorites.slice(0, FAVORITES_LIMIT);
    const displayedHistory = showAllHistory ? quizResults : quizResults.slice(0, HISTORY_LIMIT);

    return (
        <div className="min-h-screen bg-slate-50 pb-10">
            {/* Header Profile Section */}
            <div className="bg-white border-b border-slate-200 p-8 pt-12">
                <div className="max-w-md mx-auto flex flex-col items-center">
                    <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-xl mb-6 transform -rotate-3">
                        {session?.user?.name?.[0].toUpperCase() || session?.user?.email?.[0].toUpperCase()}
                    </div>

                    {isEditing ? (
                        <div className="w-full flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="flex-grow px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                                autoFocus
                            />
                            <button
                                onClick={handleSave}
                                className="bg-indigo-600 text-white px-4 rounded-xl font-bold"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 group cursor-pointer mb-1" onClick={() => setIsEditing(true)}>
                            <h1 className="text-3xl font-black text-slate-900">{session?.user?.name || 'Your Profile'}</h1>
                            <span className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">✏️</span>
                        </div>
                    )}
                    <p className="text-slate-400 font-medium mb-8">{session?.user?.email}</p>

                    <div className="grid grid-cols-3 gap-4 w-full">
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <span className="block text-2xl font-black text-slate-900">{vocabularies.length}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Words</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <span className="block text-2xl font-black text-indigo-600">
                                {favorites.length}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Favs</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <span className="block text-2xl font-black text-slate-900">
                                {averageScore}%
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-md mx-auto p-6 space-y-10">

                {/* Favorites Section */}
                <section>
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-xl font-black text-slate-900">Favorites</h2>
                        <button onClick={() => navigate('/vocabularies')} className="text-indigo-600  text-xs font-bold cursor-pointer uppercase tracking-widest">View Library</button>
                    </div>

                    {favorites.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                        {displayedFavs.map(v => (
                            <div 
                            key={v.id}
                            onClick={() => navigate(`/details/${v.id}`)}
                            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
                            >
                            <span className="block font-black text-slate-800 text-sm truncate group-hover:text-indigo-600">{v.word}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold">{v.partOfSpeech || 'Vocab'}</span>
                            </div>
                        ))}
                        {favorites.length > FAVORITES_LIMIT && (
                            <button 
                            onClick={() => setShowAllFavs(!showAllFavs)}
                            className="col-span-2 cursor-pointer py-3 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-indigo-600 transition-colors bg-white border border-slate-200 rounded-2xl mt-1"
                            >
                            {showAllFavs ? 'Show Less' : `See More (${favorites.length - FAVORITES_LIMIT} more)`}
                            </button>
                        )}
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 text-center">
                        <p className="text-slate-400 text-sm">No favorite words yet.</p>
                        </div>
                    )}
                </section>

                {/* Quiz History Section */}
                <section>
                    <h2 className="text-xl font-black text-slate-900 mb-4">Quiz History</h2>
                    <div className="space-y-3">
                        {/* {quizResults.length > 0 ? (
                            quizResults.map((item) => (
                                <div key={item.id} onClick={() => navigate(`/quiz/result/${item.id}`)} className="bg-white cursor-pointer p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${(item.score / item.total) >= 0.8 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                            }`}>
                                            {Math.round((item.score / item.total) * 100)}%
                                        </div>
                                        <div>
                                            <span className="block font-bold text-slate-800 text-sm">
                                                {item.type === "WORD_TO_DEFINITION" ? 'Word → Meaning' : 'Meaning → Word'}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                {new Date(item.date).toLocaleDateString()} • {item.score}/{item.total} pts
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xl">🏆</span>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 text-center">
                                <p className="text-slate-400 text-sm">Take your first quiz to see history.</p>
                            </div>
                        )} */}

                        {quizResults.length > 0 ? (
                            <>
                                {displayedHistory.map((item) => (
                                <div key={item.id} onClick={() => navigate(`/quiz/result/${item.id}`)} className="bg-white cursor-pointer p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${
                                        (item.score / item.total) >= 0.8 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                        {Math.round((item.score / item.total) * 100)}%
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-800 text-sm">
                                        {item.type === "WORD_TO_DEFINITION" ? 'Word → Meaning' : 'Meaning → Word'}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        {new Date(item.date).toLocaleDateString()} • {item.score}/{item.total} pts
                                        </span>
                                    </div>
                                    </div>
                                    <span className="text-xl">🏆</span>
                                </div>
                                ))}
                                
                                {quizResults.length > HISTORY_LIMIT && (
                                <button 
                                    onClick={() => setShowAllHistory(!showAllHistory)}
                                    className="w-full py-3 text-slate-500 font-bold text-xs uppercase cursor-pointer tracking-widest hover:text-indigo-600 transition-colors bg-white border border-slate-200 rounded-2xl"
                                >
                                    {showAllHistory ? 'Show Less' : `Show More Quizzes (${quizResults.length - HISTORY_LIMIT} more)`}
                                </button>
                                )}
                            </>
                            ) : (
                            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 text-center">
                                <p className="text-slate-400 text-sm">Take your first quiz to see history.</p>
                            </div>
                            )}
                    </div>
                </section>

                {/* Settings / Account Section */}
                <section className="pt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full py-4 bg-red-50 text-red-500 font-bold rounded-2xl border border-red-100 hover:bg-red-100 transition-all"
                    >
                        Log Out Account
                    </button>
                    <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-6">
                        VocabFlow v1.0 • Data stored locally
                    </p>
                </section>
            </div>
        </div>
    );
}