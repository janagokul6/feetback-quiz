'use client';

import { useState } from 'react';
import { quizQuestions } from '../../lib/quizData.js';
import { validateAnswer } from '../../lib/validation.js';
import Question from './Question.js';
import axios from 'axios';

export default function QuizForm({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: null
      }));
    }
  };

  const handleNext = () => {
    const question = quizQuestions[currentQuestion];
    const answer = answers[question.id];
    const validation = validateAnswer(question.id, answer);

    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        [question.id]: validation.error
      }));
      return;
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const formattedAnswers = quizQuestions.map(q => ({
        questionId: q.id,
        answer: answers[q.id]
      }));

      const response = await axios.post('/api/quiz/submit', {
        answers: formattedAnswers
      });

      if (response.data.success) {
        onComplete(response.data.recommendations);
      } else {
        alert('Error submitting quiz. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error submitting quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <Question
        question={question}
        answer={answers[question.id]}
        onAnswerChange={handleAnswerChange}
        error={errors[question.id]}
      />

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 
           currentQuestion === quizQuestions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}