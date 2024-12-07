import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {

    const shuffledAnswers = useRef();


    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }


    return (
        <ul
            id="answers"
        >
            {shuffledAnswers.current.map(answer => {
                let isSelectd = selectedAnswer === answer;
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
                            onClick={() => onSelect(answer)}
                            className={cssClasses}
                        >
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>
    );
}