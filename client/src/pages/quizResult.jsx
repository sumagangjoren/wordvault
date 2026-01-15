import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import supabase from "../supabaseClient";
import { useQuizContext } from "../context/quizContext";
import ConfirmModal from "../components/confirmModal";

export default function QuizResult() {

    const { quiz_result_id } = useParams();
    const { getQuizResult, result, deleteQuiz } = useQuizContext();
    const navigate = useNavigate();

    useEffect(() => {
        getQuizResult(quiz_result_id);
    }, []);

    const [showModal, setShowModal] = useState(false);
    const percentage = Math.round((result.score / result.total) * 100);
    console.log(result.score, result.total, percentage);

    return (
        <div className="p-6">
            <div className="text-center py-10 bg-indigo-600 rounded-[40px] text-white mb-10 shadow-2xl shadow-indigo-200">
                <div className="text-6xl mb-4">🏆</div>
                <h1 className="text-4xl font-black mb-1">Results</h1>
                <p className="text-indigo-100 opacity-80 mb-6">Great effort on your session!</p>
                <div className="inline-flex flex-col items-center">
                    <span className="text-7xl font-black">{percentage}%</span>
                    <span className="text-indigo-200 font-bold uppercase tracking-widest text-sm">{result.score} / {result.total} CORRECT</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-6 px-2">Review</h3>
            <div className="space-y-4 mb-10">
                {result.answers.map((ans, idx) => (
                    <div key={idx} className={`p-5 rounded-3xl border-2 transition-all ${ans.isCorrect ? 'border-green-50 bg-green-50/50' : 'border-red-50 bg-red-50/50'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-black uppercase text-slate-400">Word: {ans.word}</span>
                            <span>{ans.isCorrect ? '✅' : '❌'}</span>
                        </div>
                        <p className="text-slate-700 font-medium mb-1">Q: {ans.question}</p>
                        {!ans.isCorrect && (
                            <p className="text-sm text-red-600">Your Answer: <span className="line-through">{ans.userAnswer}</span></p>
                        )}
                        <p className={`text-sm ${ans.isCorrect ? 'text-green-700' : 'text-slate-800 font-bold'}`}>
                            Correct: {ans.correctAnswer}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col space-y-4 px-2">
                <button
                    onClick={() => navigate('/')}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                    Back Home
                </button>
            </div>
            <div className="pt-4 border-t border-slate-100">
                    <button
                        onClick={() => {
                            setShowModal(true)
                        }}
                        className="w-full cursor-pointer py-4 text-red-500 font-bold border-2 border-red-50 rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
                    >
                        <span>🗑️</span>
                        <span>Delete Quiz</span>
                    </button>
                </div>

            <ConfirmModal
                isOpen={showModal}
                title="Delete quiz?"
                message={`Are you sure you want to delete this quiz?`}
                confirmText="Yes, Delete"
                onConfirm={() => {
                    deleteQuiz(quiz_result_id);
                    setShowModal(false);
                    navigate('/profile')
                }}
                onCancel={() => setShowModal(false)}
            />
        </div>
    );
}