import { getItems } from "@/server/sap/items";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await getItems();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}