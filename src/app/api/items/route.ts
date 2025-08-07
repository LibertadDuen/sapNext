import { NextResponse } from 'next/server';
import { createItem } from '@/server/sap/items';

export async function POST(request: Request) {
  try {
    const itemsData = await request.json();
    const result = await createItem(itemsData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}