import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: [true, 'Question ID is required']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true
  }
}, { _id: false });

const quizResponseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    trim: true
  },
  answers: {
    type: [answerSchema],
    required: [true, 'Answers are required'],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one answer is required'
    }
  },
  recommendations: {
    type: String,
    required: [true, 'Recommendations are required'],
    trim: true
  },
  userEmail: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email'],
    trim: true,
    lowercase: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  emailSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

quizResponseSchema.index({
  'userEmail': 'text',
  'recommendations': 'text'
});

quizResponseSchema.index({ userId: 1, completedAt: -1 });

quizResponseSchema.methods.getLearningStyle = function () {
  const learningStyleAnswer = this.answers.find(a => a.questionId === 3);
  return learningStyleAnswer ? learningStyleAnswer.answer : 'unknown';
};

quizResponseSchema.statics.findByEmail = async function (email) {
  return this.find({ userEmail: email.toLowerCase() })
    .sort({ completedAt: -1 })
    .lean();
};

quizResponseSchema.pre('save', function (next) {
  if (this.isModified('userEmail')) {
    this.userEmail = this.userEmail.toLowerCase();
  }
  next();
});

export default mongoose.models.QuizResponse || mongoose.model('QuizResponse', quizResponseSchema);