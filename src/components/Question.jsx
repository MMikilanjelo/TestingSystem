import React, { useState } from 'react';

const Question = ({ question, onAnswerSelect }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleAnswerSelect = (event) => {
        setSelectedAnswer(event.target.value);
        onAnswerSelect(question, event.target.value);
        //console.log(question);
        //console.log(event.target.value + "my event target value");
    };

    return (
        <div>
            <h3>{question.question}</h3>
            <form>
                {question.answers.map((answer, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`answer-${index}`}
                            name="answer"
                            value={answer.answer}
                            onChange={handleAnswerSelect}
                            checked={selectedAnswer === answer.answer}
                        />
                        <label htmlFor={`answer-${index}`}>{answer.answer}</label>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default Question;
