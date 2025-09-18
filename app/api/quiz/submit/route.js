import { NextResponse } from 'next/server';
import { validateAllAnswers } from '../../../../lib/validation.js';
import { formatForMongoose, generateUserId, extractEmailFromAnswers } from '../../../../lib/quizUtils.js';
import { generateRecommendations } from '../../../../lib/recommendations.js';
import { saveQuizResponse, updateEmailStatus } from '../../../../lib/database.js';
import axios from 'axios';

export async function POST(request) {
  try {
    const { answers } = await request.json();
    const validation = validateAllAnswers(answers);
    
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      }, { status: 400 });
    }

    const recommendations = generateRecommendations(answers);
    const userId = generateUserId();
    const userEmail = extractEmailFromAnswers(answers);
    const quizData = formatForMongoose(answers, recommendations, userId, userEmail);
    const saveResult = await saveQuizResponse(quizData);

    if (!saveResult.success) {
      return NextResponse.json({
        success: false,
        error: saveResult.error || 'Failed to save quiz response'
      }, { status: 500 });
    }

    if (process.env.NODE_ENV === 'production') {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/send`, {
          email: userEmail,
          userId: saveResult.id.toString(),
          answers: quizData.answers, 
          result: recommendations
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        await updateEmailStatus(saveResult.id, false);
      }
    }

    return NextResponse.json({
      success: true,
      recommendations,
      userId: saveResult.id.toString()
    });

  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}