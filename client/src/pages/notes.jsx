import { useNoteContext } from "../context/noteContext"
import ConfirmModal from "../components/confirmModal";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Notes() {

    const [search, setSearch] = useState('')
    const { notes, note, setNote } = useNoteContext();
    const navigate = useNavigate();

    const filteredNotes = notes.filter(n => 
        n.title.toLowerCase().includes(search.toLowerCase()) || 
        n.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 min-h-screen bg-slate-50">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-1">Learning Notes</h1>
                    <p className="text-slate-500 text-sm">Document your insights and deep dives.</p>
                </div>
                <button
                    onClick={() => navigate('/notes/create')}
                    className="bg-indigo-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-90"
                >
                    <span className="text-2xl">➕</span>
                </button>
            </header>

            <div className="relative mb-8">
                <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
                <input
                    type="text"
                    placeholder="Search your notes..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 pb-24">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => navigate(`/notes/view/${note.id}`)}
                            className="bg-white p-6 rounded-[32px] border border-slate-200 hover:border-indigo-500 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                                    {note.title}
                                </h3>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setNote(note.id); }}
                                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-xl transition-all"
                                >
                                    🗑️
                                </button>
                            </div>
                            <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-4">
                                {note.content}
                            </p>
                            <div className="flex items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="text-4xl mb-4">📝</div>
                        <p className="text-slate-500 font-medium">No notes found.</p>
                        <button
                            onClick={() => navigate('/notes/create')}
                            className="text-indigo-600 font-bold mt-2 hover:underline"
                        >
                            Create your first note
                        </button>
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={!!note}
                title="Delete Note?"
                message="This will permanently remove this learning note. This action cannot be undone."
                // onConfirm={() => { if (deletingId) onDelete(deletingId); setDeletingId(null); }}
                onCancel={() => setNote(null)}
            />
        </div>
    );
}
