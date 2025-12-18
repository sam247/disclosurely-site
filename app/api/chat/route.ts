import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, message, conversationId, userId, userEmail, userName } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    // Proxy the request to Supabase Edge Function
    const response = await fetch(`${supabaseUrl}/functions/v1/chat-support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        action: action || 'send_message',
        message,
        conversationId,
        userId,
        userEmail,
        userName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: 'Failed to get response from chat service',
      }));
      return NextResponse.json(
        { error: errorData.error || 'Failed to process chat message' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

