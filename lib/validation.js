import { getQuestionById } from './quizData.js';


export const validateAnswer = (questionId, answer) => {
  const question = getQuestionById(questionId);
  
  if (!question) {
    return {
      isValid: false,
      error: 'Question not found'
    };
  }


  if (question.required && (!answer || answer.trim() === '')) {
    return {
      isValid: false,
      error: 'This question is required'
    };
  }


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


export const isQuizComplete = (answers) => {
  const requiredQuestions = [1, 2, 3, 4, 5];
  const answeredQuestions = answers.map(answer => answer.questionId);
  
  return requiredQuestions.every(questionId => 
    answeredQuestions.includes(questionId)
  );
};