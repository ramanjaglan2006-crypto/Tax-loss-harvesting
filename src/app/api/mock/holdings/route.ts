import { NextResponse } from 'next/server';
import holdings from '../../../../mock/holdings.json';

export async function GET() {
  return NextResponse.json(holdings);
}
