import { prisma } from '@libs';
import { NextResponse } from 'next/server';
import z from 'zod';

interface PATCH {
	params: {
		id: string;
	};
}

const boardPatchSchema = z.object({
	name: z.optional(z.string()),
	description: z.optional(z.string()),
	stared: z.optional(z.boolean()),
	archived: z.optional(z.boolean()),
});

export async function PATCH(req: Request, { params: { id } }: PATCH) {
	const body = await req.json();
	const data = await boardPatchSchema.parseAsync(body);

	const board = await prisma.board.update({
		where: {
			id: id,
		},
		data,
	});

	if (board === null) {
		return NextResponse.json({ message: 'Error: Board not found', status: 404 }, { status: 404 });
	}

	return NextResponse.json(board, { status: 200 });
}
