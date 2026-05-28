import { NextResponse } from 'next/server';
import capitalGains from '../../../../mock/capital-gains.json';

export async function GET() {
  return NextResponse.json(capitalGains);
}
