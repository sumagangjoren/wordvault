import { useNavigate } from "react-router";
import VocabularyCard from "../components/vocabularyCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useVocabularyContext } from "../context/vocabularyContext";

export default function Vocabularies() {

    const { vocabularies, setVocabularies, deleteVocabulary } = useVocabularyContext();
    const [search, setSearch] = useState('');
    // const [vocabularies, setVocabularies] = useState([]);
    const getVocabularies = async () => {
        const { data, error } = await supabase
            .from('vocabularies')
            .select('*');
        setVocabularies(data);
        // console.log(data)
    }

    useEffect(() => {
        getVocabularies();
    }, []);

    const navigate = useNavigate()

    const filtered = vocabularies.filter(v =>
        v.word.toLowerCase().includes(search.toLowerCase()) ||
        v.definition.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 mb-2">My Library</h1>
                <p className="text-slate-500">{vocabularies.length} words collected</p>
            </header>

            <div className="relative mb-6">
                <span className="absolute left-4 top-3 text-slate-400">🔍</span>
                <input
                    type="text"
                    placeholder="Search words..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((v) => (
                        <div
                            key={v.id}
                            // onClick={() => navigate(`/details/${v.id}`)}
                            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                    {v.word}
                                </h3>
                                {v.isFavorite && <span className="text-red-500">❤️</span>}
                            </div>
                            <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                                {v.definition}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
                    <span className="text-4xl block mb-4">😶</span>
                    <p className="text-slate-500 font-medium">No words found.</p>
                </div>
            )}
        </div>
    );
}