
export const quizQuestions = [
  {
    id: 1,
    question: "What is your primary goal?",
    type: "multiple-choice",
    options: ["Learning", "Career", "Personal", "Business"],
    required: true
  },
  {
    id: 2,
    question: "How much experience do you have?",
    type: "multiple-choice",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    required: true
  },
  {
    id: 3,
    question: "What is your preferred learning style?",
    type: "multiple-choice",
    options: ["Visual", "Auditory", "Hands-on", "Reading"],
    required: true
  },
  {
    id: 4,
    question: "How much time can you dedicate per week?",
    type: "multiple-choice",
    options: ["1-5 hours", "6-10 hours", "11-20 hours", "20+ hours"],
    required: true
  },
  {
    id: 5,
    question: "What is your email address?",
    type: "email",
    placeholder: "Enter your email address",
    required: true
  }
];

export const getTotalQuestions = () => quizQuestions.length;

export const getQuestionById = (id) => {
  return quizQuestions.find(question => question.id === id);
};

export const getAllQuestions = () => quizQuestions;