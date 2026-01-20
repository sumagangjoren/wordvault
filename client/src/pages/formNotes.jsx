import { useNavigate, useParams } from "react-router-dom";
import { useNoteContext } from "../context/noteContext";
import { useEffect } from "react";
import Quill from 'quill';
// import 'react-quill/dist/quill.snow.css';

export default function FormNotes({ handleSubmit }) {

    const { notes, note, setNote, errorMessage } = useNoteContext();
    const { note_id } = useParams();
    const editing = notes?.find(n => n.id == note_id);

    useEffect(() => {
        if (editing) {
            setNote({
                id: editing.id,
                title: editing.title || "",
                content: editing.content || "",
            });
        }

        // 🧹 cleanup runs when user leaves the page
        return () => {
            setNote({
                title: "",
                content: "",
            });
        };

    }, [editing, setNote]);

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        // e.preventDefault();
        // setErrorMessage(null);
        try {
            handleSubmit(e);
            // navigate to home or details page
            navigate(-1); // or navigate(`/vocabularies/${result.data.id}`)
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
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Topic/Title</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            required
                            className="flex-grow px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xl font-bold"
                            placeholder="e.g. Epiphany"
                            // value={vocabulary.word}
                            // onChange={(e) => setVocabulary({ ...vocabulary, word: e.target.value })}
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
                    {/* <p className="text-xs text-slate-400">Type a word and wait a moment for AI suggestions!</p> */}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Definition</label>
                   <div className="flex-grow px-6 pb-40 overflow-y-auto mt-4">
                        <ReactQuill 
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={formats}
                            placeholder="Start typing your deep dive here..."
                            className="h-full"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Example Sentence</label>
                    <textarea
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all italic"
                        placeholder="Use it in a sentence..."
                        // value={vocabulary.example}
                        // onChange={(e) => setVocabulary({ ...vocabulary, example: e.target.value })}
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