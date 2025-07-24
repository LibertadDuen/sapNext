import { NextResponse } from 'next/server';
import { getInvoices


 } from '@/server/sap/invoices';
export async function GET() {
  try {
    const invoices = await getInvoices();
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}