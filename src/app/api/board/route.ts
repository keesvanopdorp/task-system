import { prisma } from '@libs';
import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(await prisma.board.findMany({ include: { tasks: false } }), { status: 200 });
}
