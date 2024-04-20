import React, { useState } from 'react';
import Question from './Question';

const SelectedQuestions = ({ selectedQuestions }) => {
    const [testFinished, setTestFinished] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    
    const handleAnswerSelect = (question, selectedAnswer) => {
        const existingQuestionIndex = selectedAnswers.findIndex(item => item.question === question.question);
    
        if (existingQuestionIndex !== -1) {
            // If the question is already in selectedAnswers, update selectedAnswer
            const updatedCorrectAnswers = [...selectedAnswers];
            updatedCorrectAnswers[existingQuestionIndex].selectedAnswer = selectedAnswer;
            setSelectedAnswers(updatedCorrectAnswers);
        } else {
            setSelectedAnswers([...selectedAnswers, { question: question.question, selectedAnswers: question.answers, selectedAnswer: selectedAnswer }]);
        }
        console.log(selectedAnswers);
    };

    const handleFinishTest = () => {
        let score = 0;

        selectedAnswers.forEach(selectedAnswer => {
            const correctAnswer = selectedAnswer.selectedAnswers.find(answer => answer.answer === selectedAnswer.selectedAnswer);
        
            if (correctAnswer && correctAnswer.isCorrect) {
                score++;
            }
        });
        
        console.log("Score:", score);
    
        const totalQuestions = selectedQuestions.length;    
        const percentageScore = (score / totalQuestions) * 100;
    
        setFinalScore(percentageScore.toFixed(2));
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
                        {selectedAnswers.map((answer, index) => (
                            <li key={index}>
                                Question {answer.id}: {answer.selectedAnswer}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelectedQuestions;
