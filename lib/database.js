import dbConnect from './mongodb';
import QuizResponse from './models/quizRes.model';

export async function saveQuizResponse(quizData) {
  try {
    await dbConnect();
    const quizResponse = new QuizResponse(quizData);
    const result = await quizResponse.save();
    return { 
      success: true, 
      id: result._id 
    };
  } catch (error) {
    console.error('Database save error:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

export async function updateEmailStatus(id, emailSent) {
  try {
    await dbConnect();
    await QuizResponse.findByIdAndUpdate(id, { emailSent });
    return { success: true };
  } catch (error) {
    console.error('Email status update error:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

export async function getQuizResponse(id) {
  try {
    await dbConnect();
    const response = await QuizResponse.findById(id).lean();
    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Get quiz response error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}