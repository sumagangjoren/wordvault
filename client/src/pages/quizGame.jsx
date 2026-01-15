import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVocabularyContext } from "../context/vocabularyContext";
import { useQuizContext } from "../context/quizContext";

export default function QuizGame() {

    const location = useLocation();
    const navigate = useNavigate();
    const { createQuizResult } = useQuizContext();
    const { state, collection_id } = location;
    console.log(state.type)
    const QuizType = { WORD_TO_DEFINITION: 'WORD_TO_DEFINITION' }
    const type = {
        WORD_TO_DEFINITION: 'WORD_TO_DEFINITION'
    };

    const { vocabularies } = useVocabularyContext();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
            // Filter source words if a collection is selected
    const sourceWords = state.collection_id ? vocabularies.filter(v => v.collection_id === state.collection_id) : vocabularies;

    const shuffled = [...sourceWords].sort(() => 0.5 - Math.random()).slice(0, 10);

        // const shuffled = [...vocabularies].sort(() => 0.5 - Math.random()).slice(0, 10);
        const generated = shuffled.map(v => {
            const distractors = vocabularies
                .filter(x => x.id !== v.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            const options = type === QuizType.WORD_TO_DEFINITION
                ? [v.definition, ...distractors.map(d => d.definition)]
                : [v.word, ...distractors.map(d => d.word)];

            return {
                id: crypto.randomUUID(),
                question: type === QuizType.WORD_TO_DEFINITION ? v.word : v.definition,
                correctAnswer: type === QuizType.WORD_TO_DEFINITION ? v.definition : v.word,
                options: options.sort(() => 0.5 - Math.random()),
                wordId: v.id
            };
        });

        console.log(generated)
        console.log('hello')
        setQuestions(generated);
    }, [vocabularies, state]);

    const handleAnswer = (option) => {
        if (selectedOption) return;
        setSelectedOption(option);

        const q = questions[currentIndex];
        const isCorrect = option === q.correctAnswer;

        const newAnswer = {
            question: q.question,
            userAnswer: option,
            correctAnswer: q.correctAnswer,
            isCorrect,
            word: vocabularies.find(v => v.id === q.wordId)?.word || ''
        };

        setAnswers([...answers, newAnswer]);

        setTimeout(async () => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedOption(null);
            } else {
                const finalScore = answers.filter(a => a.isCorrect).length;
                const result = {
                    score: finalScore,
                    total: questions.length,
                    answers: [...answers, newAnswer],
                    type: state.type
                };

                console.log('Quiz completed:', result);
                // console.log(result)
                const quizResult = await createQuizResult(result);

                if (!quizResult) {
                    console.error("Failed to create quiz result");
                    return;
                }

                navigate(`/quiz/result/${quizResult.id}`, {
                    state: { result }
                });
            }
        }, 800);
    };

    const onComplete = null;

    if (questions.length === 0) return <div className="p-10 text-center">Preparing Quiz...</div>;

    const currentQuestion = questions[currentIndex];

    return (
        <div className="p-6 flex flex-col min-h-[90vh]">
            <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-indigo-600 font-black text-sm uppercase tracking-widest">Question {currentIndex + 1} / {questions.length}</span>
                    <span className="text-slate-400 font-bold text-xs">{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-500 transition-all duration-500"
                        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex-grow flex flex-col items-center">
                <div className="w-full text-center mb-12">
                    <h2 className={`font-black text-slate-800 leading-tight ${type === QuizType.WORD_TO_DEFINITION ? 'text-5xl' : 'text-2xl'}`}>
                        {currentQuestion.question}
                    </h2>
                </div>

                <div className="w-full space-y-4">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentQuestion.correctAnswer;
                        let bgColor = 'bg-white border-slate-100';

                        if (selectedOption) {
                            if (isCorrect) bgColor = 'bg-green-100 border-green-500 text-green-700';
                            else if (isSelected) bgColor = 'bg-red-100 border-red-500 text-red-700';
                        }

                        return (
                            <button
                                key={idx}
                                disabled={!!selectedOption}
                                onClick={() => handleAnswer(option)}
                                className={`w-full p-6 text-left rounded-3xl border-2 transition-all font-medium flex items-center justify-between shadow-sm active:scale-[0.98] ${bgColor}`}
                            >
                                <span className="flex-grow">{option}</span>
                                {selectedOption && isCorrect && <span className="ml-2">✅</span>}
                                {selectedOption && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}