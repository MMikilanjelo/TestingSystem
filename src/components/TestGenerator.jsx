import React, { useState, useEffect } from 'react';
import SelectedQuestions from './SelectedQuestions';
import testData from "./questions.json" 

const TestGenerator = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [testName, setTestName] = useState('');
    const [testGenerated, setTestGenerated] = useState(false); 

    useEffect(() => {
        setQuestions(testData.questions);
        setTestName(testData.testName); 
    }, []); 

    const handleQuestionSelect = (question) => {
        const isSelected = selectedQuestions.some((q) => q.question === question.question);
        if (isSelected) {
            setSelectedQuestions(selectedQuestions.filter((q) => q.question !== question.question));
        } else {
            setSelectedQuestions([...selectedQuestions, question]);
        }
    };

    const generateTest = () => {
        setTestGenerated(true);
    };

    return (
        <div>
            <h1>{testName}</h1>
            <div>
                <h2>Select Questions for the Test:</h2>
                {questions.map((question, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`question-${index}`}
                            onChange={() => handleQuestionSelect(question)}
                        />
                        <label htmlFor={`question-${index}`}>{question.question}</label>
                    </div>
                ))}
            </div>
            <button onClick={generateTest}>Generate Test</button>
            {testGenerated && (
                <SelectedQuestions selectedQuestions={selectedQuestions} />
            )}
        </div>
    );
};

export default TestGenerator;
