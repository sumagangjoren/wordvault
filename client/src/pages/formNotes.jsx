import { useNavigate, useParams } from "react-router-dom";
import { useNoteContext } from "../context/noteContext";
import { useEffect } from "react";
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Link from '@tiptap/extension-link';
import { TextStyleKit } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import './editor.css'


export default function FormNotes({ handleSubmit }) {

    const { notes, note, setNote } = useNoteContext();
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


    const baseBtn = "p-2.5 rounded-xl transition-all flex items-center justify-center font-bold "
    const activeBtn = "bg-indigo-600 text-white shadow-sm"

    function MenuBar({ editor }) {
        const editorState = useEditorState({
            editor,
            selector: ctx => ({
                isBold: ctx.editor.isActive('bold'),
                canBold: ctx.editor.can().chain().toggleBold().run(),
                isItalic: ctx.editor.isActive('italic'),
                canItalic: ctx.editor.can().chain().toggleItalic().run(),
                isStrike: ctx.editor.isActive('strike'),
                canStrike: ctx.editor.can().chain().toggleStrike().run(),
                isCode: ctx.editor.isActive('code'),
                canCode: ctx.editor.can().chain().toggleCode().run(),
                isParagraph: ctx.editor.isActive('paragraph'),
                isHeading1: ctx.editor.isActive('heading', { level: 1 }),
                isHeading2: ctx.editor.isActive('heading', { level: 2 }),
                isBulletList: ctx.editor.isActive('bulletList'),
                isOrderedList: ctx.editor.isActive('orderedList'),
                isCodeBlock: ctx.editor.isActive('codeBlock'),
                isBlockquote: ctx.editor.isActive('blockquote'),
                canUndo: ctx.editor.can().chain().undo().run(),
                canRedo: ctx.editor.can().chain().redo().run(),
            }),
        })

        return (
            <div className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
                <div className="flex flex-wrap gap-1 p-2">
                    {/* Text styles */}
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editorState.canBold}
                        className={`${baseBtn} ${editorState.isBold && activeBtn}`}
                    >
                        B
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editorState.canItalic}
                        className={`${baseBtn} ${editorState.isItalic && activeBtn}`}
                    >
                        I
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editorState.canStrike}
                        className={`${baseBtn} ${editorState.isStrike && activeBtn}`}
                    >
                        S
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        disabled={!editorState.canCode}
                        className={`${baseBtn} font-mono ${editorState.isCode && activeBtn}`}
                    >
                        {"</>"}
                    </button>

                    {/* <div className="mx-1 h-6 w-px bg-gray-300" /> */}

                    {/* Headings */}
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`${baseBtn} ${editorState.isParagraph && activeBtn}`}
                    >
                        P
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`${baseBtn} ${editorState.isHeading1 && activeBtn}`}
                    >
                        H1
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`${baseBtn} ${editorState.isHeading2 && activeBtn}`}
                    >
                        H2
                    </button>

                    {/* <div className="mx-1 h-6 w-px bg-gray-300" /> */}

                    {/* Lists & blocks */}
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`${baseBtn} ${editorState.isBulletList && activeBtn}`}
                    >
                        • List
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`${baseBtn} ${editorState.isOrderedList && activeBtn}`}
                    >
                        1. List
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`${baseBtn} ${editorState.isBlockquote && activeBtn}`}
                    >
                        ❝
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`${baseBtn} ${editorState.isCodeBlock && activeBtn}`}
                    >
                        Code
                    </button>

                    {/* <div className="mx-1 h-6 w-px bg-gray-300" /> */}

                    {/* History */}
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editorState.canUndo}
                        className={baseBtn}
                    >
                        Undo
                    </button>

                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editorState.canRedo}
                        className={baseBtn}
                    >
                        Redo
                    </button>
                </div>
            </div>
        )
    }

    const editor = useEditor({
        extensions: [TextStyleKit, StarterKit],
        content: editing?.content || '',
        editorProps: {
        attributes: {
                class: 'prose prose-slate max-w-none focus:outline-none min-h-[400px]',
            },
        },
    })



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
            {/* {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                    {errorMessage}
                </div>
            )} */}

            <form onSubmit={handleFormSubmit} className="flex-grow flex flex-col max-w-3xl mx-auto w-full">
                <input
                    type="text"
                    required
                    placeholder="Topic / Title..."
                    className="w-full text-4xl font-black text-slate-900 placeholder-slate-200 outline-none border-none mb-6"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                />

                {/* MenuBar is now positioned here, above the editor content */}
                <div className="sticky top-0 z-30 bg-white pt-2 text-sm" >
                    <MenuBar editor={editor} />
                </div>
                <div className="p-2 border border-slate-200 mt-2">
                    <EditorContent editor={editor} className="tiptap" />
                </div>

                <div className="fixed bottom-20 left-6 right-6 flex justify-center z-40 pointer-events-none">

                    <button
                        type="submit"
                        className="w-full max-w-md bg-slate-900 text-white font-black py-5 rounded-[24px] shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center space-x-2 pointer-events-auto"
                    >
                        <span>💾</span>
                        <span>{editing ? 'Update Note' : 'Save Note'}</span>
                    </button>
                </div>
            </form>
        </div>
    );

}