import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    code: 0,
    message: "success",
    data: {
      message: "Hello from FunTong API!",
      timestamp: new Date().toISOString(),
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    code: 0,
    message: "success",
    data: {
      received: body,
      timestamp: new Date().toISOString(),
    },
  });
}
