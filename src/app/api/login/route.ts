import { NextResponse } from 'next/server';
import { login } from '@/server/serviceLayer';

export async function POST() {
  try {
    await login();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}