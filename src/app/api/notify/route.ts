import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Check if tokens are available
    if (!BOT_TOKEN || !CHAT_ID) {
      console.warn('Telegram Notification Mocked. Missing ENVs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.');
      console.log('--- Mock Push Notification ---');
      console.log(`Payload: ${message}`);
      console.log('------------------------------');
      return NextResponse.json({ success: true, mocked: true });
    }

    // Call the Telegram Bot API to push to mobile
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API responded with ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to send notification', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
