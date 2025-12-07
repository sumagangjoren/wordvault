import { useState } from 'react';
import { useAuthContext } from '../context/authContext';

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { session } = useAuthContext();

    console.log(session)
    const words = [
        { title: 'Serendipity', definition: 'The occurrence of events by chance in a happy or beneficial way', partOfSpeech: 'noun' },
        { title: 'Ephemeral', definition: 'Lasting for a very short time', partOfSpeech: 'adjective' },
        { title: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', partOfSpeech: 'adjective' },
        { title: 'Procrastinate', definition: 'To delay or postpone something', partOfSpeech: 'verb' },
    ];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    };

    const current = words[currentIndex];

    return (
        <div className="flex flex-col h-screen bg-gray-50 pb-10">
            {/* Content Container */}
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">{current.title}</h1>
                    <p className="text-lg text-blue-600 font-semibold mb-6">{current.partOfSpeech}</p>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">{current.definition}</p>
                </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="bg-white border-t border-gray-200 p-6 flex justify-center gap-4 mb-20">
                <button onClick={handlePrev} className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-lg">Previous</button>
                <button onClick={handleNext} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">Next</button>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">Favorite</button>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">Share</button>
            </div> */}

            <footer style={footer} className="pb-10">
                <button aria-label="icon-1">
                    {/* Star icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M12 17.3L5.6 20l1.1-6.4L2.5 9.6l6.5-.9L12 3l3 5.7 6.5.9-4.2 3.9L18.4 20 12 17.3z" fill="currentColor"/>
                    </svg>
                </button>

                <button aria-label="icon-2">
                    {/* Pencil / Edit icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                    </svg>
                </button>

                <button aria-label="icon-3">
                    {/* Trash icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                    </svg>
                </button>

                <button aria-label="icon-4">
                    {/* Share icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.2 3.2 0 0 0 0-1.4l7.02-4.11A2.99 2.99 0 1 0 15 5a2.99 2.99 0 0 0 .96 2.24L8.94 11.3a3 3 0 1 0 0 1.4l7.02 4.11A2.99 2.99 0 1 0 18 16.08z" fill="currentColor"/>
                    </svg>
                </button>
            </footer>
        </div>
    );
}

const footer = {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 20,
        display: "flex",
        justifyContent: "center",
        gap: 16,
        pointerEvents: "auto",
    }

export default Home;