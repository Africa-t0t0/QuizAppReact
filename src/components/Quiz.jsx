import { useState } from "react";

import QUESTIONS from '../questions.js';

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    function handleSelectedAnswer(selectedAnswer) {

        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer];
        });
    }

    return (
        <div
            id="quiz"
        >
            <div id="question">
                <p>Currently active question</p>
                <h2>
                    {QUESTIONS[activeQuestionIndex].text}
                    <ul
                        id="answers"
                    >
                        {QUESTIONS[activeQuestionIndex].answers.map(answer => (
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