import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useNoteContext } from "../context/noteContext";
import './editor.css'
import ConfirmModal from "../components/confirmModal";

const showNotes = () => {

    const { notes, deleteNote } = useNoteContext();
    const { note_id } = useParams();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    console.log(notes)
    const note = notes.find(n => n.id == note_id);

    if (!note) {
        return <div className="p-10 text-center">Note not found.</div>;
    }

    console.log(note)

    return (
    <div className="min-h-screen bg-white pb-20">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/notes')} 
          className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 transition-all"
        >
          ←
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate(`/notes/${note.id}/edit`)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
          >
            ✏️
          </button>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"
          >
            🗑️
          </button>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          {/* <div className="flex items-center space-x-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
            <span>Last Edited</span>
            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
            <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
          </div> */}
          <h1 className="text-5xl font-black text-slate-900 leading-tight">
            {note.title}
          </h1>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <div 
            className="text-lg text-slate-700 leading-relaxed rich-content tiptap"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </div>
      </article>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Permanently Delete?"
        message="This note will be gone forever. Make sure you've backed up any important React secrets!"
        confirmText="Yes, Delete"
        onConfirm={() => {
          deleteNote(note.id);
          setShowDeleteModal(false);
          navigate('/notes');
        }}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* <style>{`
        .rich-content ul { list-style-type: disc !important; padding-left: 1.5rem !important; margin-bottom: 1rem; }
        .rich-content ol { list-style-type: decimal !important; padding-left: 1.5rem !important; margin-bottom: 1rem; }
        .rich-content blockquote { border-left: 4px solid #e2e8f0; padding-left: 1rem; font-style: italic; color: #64748b; margin: 1.5rem 0; }
        .rich-content b, .rich-content strong { font-weight: 800; color: #1e293b; }
        .rich-content a { color: #4f46e5; text-decoration: underline; }
      `}</style> */}
    </div>
  );
}

export default showNotes