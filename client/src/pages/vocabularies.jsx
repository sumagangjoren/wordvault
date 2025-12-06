import { useNavigate } from "react-router";
import VocabularyCard from "../components/vocabularyCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

function Vocabularies() {


    const [vocabularies, setVocabularies] = useState([]);
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

    const input = { padding: 10, fontSize: 16, borderRadius: 8, border: "1px solid #ddd", outline: "none" };

    return (
        <>
            <div className="m-4">
                <input type="text" placeholder="search" style={input} className="w-full mb-8"/>
                {vocabularies.map((vocabulary, i) => (
                    <VocabularyCard vocabulary={vocabulary} key={i}/>
                ))}
                <div className="bottom-20 right-2 absolute pr-4">
                    <button className="bg-green-200 p-4 rounded-xl" onClick={() => navigate('/vocabularies/create')}>
                        <PlusIcon />
                        Add
                    </button>
                </div>
            </div>
        </>
    )
}

export default Vocabularies;