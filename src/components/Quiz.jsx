import { useCallback, useState } from "react";

import QUESTIONS from '../questions.js';

import quizCompletedImg from '../assets/quiz-complete.png';

import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectedAnswer =  useCallback(
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
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div
            id="quiz"
        >
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={10000}
                    onTimeout={null}
                />
                <p>Currently active question</p>
                <h2>
                    {QUESTIONS[activeQuestionIndex].text}
                    <ul
                        id="answers"
                    >
                        {shuffledAnswers.map(answer => (
                            <li
                                className="answer"
                                key={answer}
                            >
                                <button
                                    onClick={() => handleSelectedAnswer(answer)}
                                >
                                    {answer}
                                </button>
                            </li>
                        ))}
                    </ul>
                </h2>
            </div>
        </div>
    );
}