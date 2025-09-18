import { getAnswerByQuestionId } from './quizUtils.js';

export function generateRecommendations(answers) {
  const goal = getAnswerByQuestionId(answers, 1);
  const experience = getAnswerByQuestionId(answers, 2);
  const learningStyle = getAnswerByQuestionId(answers, 3);
  const timeCommitment = getAnswerByQuestionId(answers, 4);

  let recommendation = '';

  // Base recommendation based on goal
  switch (goal) {
    case 'Learning':
      recommendation += 'Focus on structured learning paths and educational resources. ';
      break;
    case 'Career':
      recommendation += 'Prioritize industry-relevant skills and professional development. ';
      break;
    case 'Personal':
      recommendation += 'Explore topics that align with your personal interests and growth. ';
      break;
    case 'Business':
      recommendation += 'Concentrate on entrepreneurial skills and business development. ';
      break;
  }

  // Add experience-based advice
  switch (experience) {
    case 'Beginner':
      recommendation += 'Start with foundational concepts and basic tutorials. ';
      break;
    case 'Intermediate':
      recommendation += 'Build on your existing knowledge with intermediate-level projects. ';
      break;
    case 'Advanced':
      recommendation += 'Challenge yourself with complex problems and advanced techniques. ';
      break;
    case 'Expert':
      recommendation += 'Consider mentoring others and contributing to the community. ';
      break;
  }

  // Add learning style recommendations
  switch (learningStyle) {
    case 'Visual':
      recommendation += 'Use diagrams, videos, and visual aids for better understanding. ';
      break;
    case 'Auditory':
      recommendation += 'Listen to podcasts, lectures, and participate in discussions. ';
      break;
    case 'Hands-on':
      recommendation += 'Practice with real projects and interactive exercises. ';
      break;
    case 'Reading':
      recommendation += 'Study documentation, books, and written materials thoroughly. ';
      break;
  }

  // Add time-based suggestions
  switch (timeCommitment) {
    case '1-5 hours':
      recommendation += 'Focus on short, focused sessions with clear objectives.';
      break;
    case '6-10 hours':
      recommendation += 'Plan weekly goals and maintain consistent progress.';
      break;
    case '11-20 hours':
      recommendation += 'Take on substantial projects and deep-dive learning.';
      break;
    case '20+ hours':
      recommendation += 'Consider intensive programs and comprehensive skill development.';
      break;
  }

  return recommendation.trim();
}