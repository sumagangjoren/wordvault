import { createContext, useContext, useState } from "react";
import supabase from "../supabaseClient";
import { useAuthContext } from "./authContext";

const QuizContext = createContext();
export const useQuizContext = () => useContext(QuizContext);

export const QuizContextProvider = ({ children }) => {

    const { session } = useAuthContext();
    const [quizResults, setQuizResults] = useState([]);
    const [result, setResult] = useState({
        score: 0,
        total: 0,
        answers: []
    });

    const getQuizResult = async (quiz_result_id) => {
        const { data, error } = await supabase
        .from('quiz_results')
        .select(`
            *,
            answers (*)
        `)
        .eq('id', quiz_result_id)
        .single();

        console.log(data)
        if(!error) {
            setResult(data);
        }
        else {
            console.error("Error fetching quiz result:", error);
        }
    }

    const fetchQuizResults = async () => {
        const { data, error } = await supabase
        .from('quiz_results')
        .select()
        .eq('user_id', session.user.id);

        if (!error) {
            setQuizResults(data);
        }
    };

    const deleteQuiz = async (id) => {
        const { error } = await supabase
        .from('quiz_results')
        .delete()
        .eq('id', id)
        
        if (error) {
            console.error("Supabase error:", error);
            return;
        }

        setQuizResults(prev => prev.filter(q => q.id !== id));
    };

    // const getQuizResult = async (quit_result_id) => {
    //     const { data, error } = await supabase
    //     .from('quiz_results')
    //     .select()
    //     .eq('user_id', session.user.id)
    //     .eq('id', quit_result_id)
    //     .single();

    //     if (!error) {
    //         setQuizResults(data);
    //     }
    // };

    const createQuizResult = async (result) => {

        console.log(result)
        const { data: quizResult, error: quizError } = await supabase
            .from("quiz_results")
            .insert({
                user_id: session.user.id,
                score: result.score,
                total: result.total,
                type: result.type,
            })
            .select()
            .single(); // 👈 VERY IMPORTANT

        if (quizError) {
            console.error("Quiz result error:", quizError);
            return;
        }

        const answersPayload = result.answers.map(answer => ({
            quiz_result_id: quizResult.id,
            question: answer.question,
            word: answer.word,
            userAnswer: answer.userAnswer,
            correctAnswer: answer.correctAnswer,
            isCorrect: answer.isCorrect,
        }));

        const { error: answersError } = await supabase
            .from("answers")
            .insert(answersPayload);

        if (answersError) {
            console.error("Answers error:", answersError);
            return;
        }

        setResult({
            score: 0,
            total: 0,
            answers: []
        });

        return quizResult;
    };

    return (
        <QuizContext.Provider value={{ quizResults, setQuizResults, fetchQuizResults, createQuizResult, getQuizResult, result, deleteQuiz }}>
            { children }
        </QuizContext.Provider>
    )

}