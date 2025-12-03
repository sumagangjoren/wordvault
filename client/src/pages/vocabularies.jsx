import { useNavigate } from "react-router";
import VocabularyCard from "../components/vocabularyCard";
import { PlusIcon } from "@heroicons/react/24/outline";

function Vocabularies() {

    const navigate = useNavigate()

    const input = { padding: 10, fontSize: 16, borderRadius: 8, border: "1px solid #ddd", outline: "none" };

    return (
        <>
            <div className="m-4">
                <input type="text" placeholder="search" style={input} className="w-full mb-8"/>
                {[...Array(3)].map((_, i) => (
                    <VocabularyCard title={"Title " + i} description={"Description " + i} key={i} />
                ))}
                <div className="bottom-20 right-2 absolute pr-4">
                    <button className="bg-green-200 p-4 rounded-xl" onClick={() => navigate('create')}>
                        <PlusIcon />
                        Add
                    </button>
                </div>
            </div>
        </>
    )
}

export default Vocabularies;