import { useCallback, useState } from "react";

import QUESTIONS from '../questions.js';

import quizCompletedImg from '../assets/quiz-complete.png';

import QuestionTimer from "./QuestionTimer.jsx";

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
                        {shuffledAnswers.map(answer => {
                            let isSelectd = userAnswers[userAnswers.length - 1] === answer;
                            let cssClasses = '';

                            if (answerState === 'answered' && isSelectd) {
                                cssClasses = 'selected';
                            }

                            if ((answerState === 'correct' || answerState === 'wrong') && isSelectd) {
                                cssClasses = answerState;
                            }
                            return (
                                <li
                                    className="answer"
                                    key={answer}
                                >
                                    <button
                                        onClick={() => handleSelectedAnswer(answer)}
                                        className={cssClasses}
                                    >
                                        {answer}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </h2>
            </div>
        </div>
    );
}