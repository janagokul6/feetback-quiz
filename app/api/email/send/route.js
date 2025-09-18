import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { email, answers, result, userId } = await request.json();

    if (!email || !answers || !result) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    //Format answers
    const answersText = answers.map(answer => 
      `${answer.question}: ${answer.answer}`
    ).join('\n');

    const emailContent = `
Dear Quiz Participant,

Thank you for completing our quiz! Here are your results:

QUIZ ANSWERS:
${answersText}

 YOUR RESULT:
${result}

Your unique ID: ${userId}

Best regards,
Quiz App Team
    `.trim();


    const zeptomailResponse = await axios.post('https://api.zeptomail.com/v1.1/email', {
      from: {
        address: `noreply@${process.env.ZEPTOMAIL_DOMAIN}`,
        name: 'Quiz App'
      },
      to: [{
        email_address: {
          address: email,
          name: 'Quiz Participant'
        }
      }],
      subject: 'Your Quiz Results and Answers',
      textbody: emailContent
    }, {
      headers: {
        'Authorization': `Zoho-enczapikey ${process.env.ZEPTOMAIL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send email'
    }, { status: 500 });
  }
}