import { useNavigate, useParams } from "react-router";
import { useCollectionContext } from "../context/collectionContext";
import { useVocabularyContext } from "../context/vocabularyContext";

export default function ShowCollection() {

    const { collection_id } = useParams();
    const { collections, fetchCollections } = useCollectionContext();
    const { vocabularies } = useVocabularyContext();
    const navigate = useNavigate();

    const col = collections.find(c => c.id == collection_id);
    const words = vocabularies.filter(v => v.collection_id == collection_id);

    if (!col) return <div className="p-10 text-center">Collection not found.</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="p-8 bg-slate-50 border-b border-slate-200">
        <button onClick={() => navigate(-1)} className="text-slate-400 mb-6 block font-bold">← Back to Library</button>
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-5xl">{col.emoji}</div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">{col.name}</h1>
            <p className="text-slate-500 text-sm">{words.length} Words in this set</p>
          </div>
        </div>
        {col.description && (
          <p className="text-slate-600 mb-8 leading-relaxed italic border-l-4 border-indigo-200 pl-4">{col.description}</p>
        )}

        <button 
          onClick={() => navigate('/quiz/play', { state: { type: QuizType.WORD_TO_DEFINITION, collectionId: col.id } })}
          disabled={words.length < 4}
          className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>🧠</span>
          <span>Launch Collection Quiz</span>
        </button>
        {words.length < 4 && <p className="text-[10px] text-orange-500 font-bold uppercase mt-2 text-center">Need at least 4 words for a quiz</p>}
      </div>

      <div className="p-6 space-y-4 pb-20">
        {words.length > 0 ? (
          words.map(v => (
            <div 
              key={v.id} 
              onClick={() => navigate(`/vocabularies/${v.id}`)}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div>
                <h3 className="font-bold text-slate-800">{v.word}</h3>
                <p className="text-slate-400 text-xs line-clamp-1">{v.definition}</p>
              </div>
              <span className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-sm mb-4">This collection is empty.</p>
            <button 
              onClick={() => navigate('/vocabularies/create')}
              className="text-indigo-600 font-bold hover:underline"
            >
              + Add words here
            </button>
          </div>
        )}
      </div>
    </div>
  );
}