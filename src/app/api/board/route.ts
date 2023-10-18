import { prisma } from '@libs';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
	return NextResponse.json(await prisma.board.findMany({ include: { tasks: false } }), { status: 200 });
}

const postSchema = z.object({
	name: z.string(),
	description: z.optional(z.string()),
	stared: z.optional(z.boolean()),
	archived: z.optional(z.boolean()),
});

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const data = await postSchema.parseAsync(json);
		const board = await prisma.board.create({
			data,
		});

		return NextResponse.json(board, { status: 201 });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: 'Error: Something go wrong on the server', status: 500 }, { status: 500 });
	}
}
