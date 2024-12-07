import { useCallback, useState } from "react";

import QUESTIONS from '../questions.js';

import quizCompletedImg from '../assets/quiz-complete.png';

import Question from "./Question.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectedAnswer = useCallback(
        function handleSelectedAnswer(selectedAnswer) {
            setAnswerState('answered');
            setUserAnswers((prevUserAnswer) => {
                return [...prevUserAnswer, selectedAnswer];
            });
            setTimeout(() => {
                if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                    setAnswerState('correct');
                } else {
                    setAnswerState('wrong');
                }

                setTimeout(() => {
                    setAnswerState('');
                }, 2000);
            }, 1000);
        }, [activeQuestionIndex]
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
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectedAnswer}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}