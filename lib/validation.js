import { getQuestionById } from './quizData.js';

// Validate a single answer
export const validateAnswer = (questionId, answer) => {
  const question = getQuestionById(questionId);
  
  if (!question) {
    return {
      isValid: false,
      error: 'Question not found'
    };
  }

  // Check if answer is required and empty
  if (question.required && (!answer || answer.trim() === '')) {
    return {
      isValid: false,
      error: 'This question is required'
    };
  }

  // Validate based on question type
  switch (question.type) {
    case 'multiple-choice':
      return validateMultipleChoice(question, answer);
    case 'email':
      return validateEmail(answer);
    default:
      return {
        isValid: true,
        error: null
      };
  }
};

// Validate multiple choice answer
const validateMultipleChoice = (question, answer) => {
  if (!question.options.includes(answer)) {
    return {
      isValid: false,
      error: 'Please select a valid option'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};

// Validate all quiz answers
export const validateAllAnswers = (answers) => {
  const errors = {};
  let isValid = true;

  answers.forEach(answer => {
    const validation = validateAnswer(answer.questionId, answer.answer);
    if (!validation.isValid) {
      errors[answer.questionId] = validation.error;
      isValid = false;
    }
  });

  return {
    isValid,
    errors
  };
};

// Check if quiz is complete (all required questions answered)
export const isQuizComplete = (answers) => {
  const requiredQuestions = [1, 2, 3, 4, 5]; // All questions are required
  const answeredQuestions = answers.map(answer => answer.questionId);
  
  return requiredQuestions.every(questionId => 
    answeredQuestions.includes(questionId)
  );
};