import React, { useState } from 'react';
import Question from './Question';

const SelectedQuestions = ({ selectedQuestions }) => {
    const [testFinished, setTestFinished] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    const handleAnswerSelect = (question, selectedAnswer) => {
        setCorrectAnswers(prevState => [
            ...prevState,
            { id: question.id, correctAnswer: question.correctAnswer, selectedAnswer }
        ]);
    };

    const handleFinishTest = () => {
        //problem here with selection questions
        console.log(selectedQuestions)
        const totalQuestions = selectedQuestions.length;
        const correctCount = correctAnswers.filter(answer => answer.correctAnswer === answer.selectedAnswer).length;
        const score = (correctCount / totalQuestions) * 100;
        setFinalScore(score.toFixed(2));
        setTestFinished(true);
    };

    return (
        <div>
            <h2>Generated Test:</h2>
            {selectedQuestions.map((question, index) => (
                <Question key={index} question={question} onAnswerSelect={handleAnswerSelect} />
            ))}
            {!testFinished && <button onClick={handleFinishTest}>Finish Test</button>}
            {testFinished && (
                <div>
                    <p>Final Score: {finalScore}%</p>
                    <h3>Correct Answers:</h3>
                    <ul>
                        {correctAnswers.map((answer, index) => (
                            <li key={index}>
                                Question {answer.id}: {answer.correctAnswer}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectedQuestions;
