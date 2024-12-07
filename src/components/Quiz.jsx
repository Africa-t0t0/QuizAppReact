import { useCallback, useState } from "react";

import QUESTIONS from '../questions.js';

import quizCompletedImg from '../assets/quiz-complete.png';

import Question from "./Question.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectedAnswer = useCallback(
        function handleSelectedAnswer(selectedAnswer) {
            setUserAnswers((prevUserAnswer) => {
                return [...prevUserAnswer, selectedAnswer];
            });
        }, []
    );

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null)
        , [handleSelectedAnswer])

    if (quizIsComplete) {
        return (
            <>
                <div id="summary">
                    <img
                        src={quizCompletedImg}
                        alt="Trophy Icon"
                    />
                    <h2>
                        Quiz Completed!
                    </h2>
                </div>
            </>
        );
    }


    return (
        <div
            id="quiz"
        >
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectedAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}