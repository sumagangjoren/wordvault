import { useState } from 'react';


function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

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
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Content Container */}
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">{current.title}</h1>
                    <p className="text-lg text-blue-600 font-semibold mb-6">{current.partOfSpeech}</p>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">{current.definition}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white border-t border-gray-200 p-6 flex justify-center gap-4 mb-20">
                <button onClick={handlePrev} className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-lg">Previous</button>
                <button onClick={handleNext} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">Next</button>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">Favorite</button>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">Share</button>
            </div>
        </div>
    );
}

export default Home;