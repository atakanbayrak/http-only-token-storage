import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const response = await fetch("http://localhost:8081/login/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const data = await response.json();

    // HttpOnly cookie ayarlama
    // NextResponse ile headers set edilebilir
    const headers = new Headers();
    headers.append('Set-Cookie', `token=${data.data.token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);

    return new NextResponse(JSON.stringify({
      messageType: data.resultMessage.messageType,
      userType: data.data.userSignUpTypes,
      userId: data.data.userId
    }), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
