import { getQuestionById } from './quizData.js';
import mongoose from 'mongoose';

export const formatAnswersForStorage = (answers) => {
  return answers.map(answer => {
    const question = getQuestionById(answer.questionId);
    return {
      questionId: answer.questionId,
      question: question ? question.question : 'Unknown question',
      answer: answer.answer
    };
  });
};

export const generateUserId = () => {
  return new mongoose.Types.ObjectId();
};

export const extractEmailFromAnswers = (answers) => {
  const emailAnswer = answers.find(answer => answer.questionId === 5);
  return emailAnswer ? emailAnswer.answer.trim().toLowerCase() : null;
};

export const formatForMongoose = (answers, recommendations, userId, userEmail) => ({
  userId,
  answers: formatAnswersForStorage(answers),
  recommendations,
  userEmail,
  emailSent: false
});

export const getAnswerByQuestionId = (answers, questionId) => {
  const answer = answers.find(a => a.questionId === questionId);
  return answer ? answer.answer : null;
};