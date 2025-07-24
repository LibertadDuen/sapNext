import { NextResponse } from 'next/server';
import { getBusinessPartners } from '@/server/sap/businessPartners';

export async function GET() {
  try {
    const partners = await getBusinessPartners();
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}