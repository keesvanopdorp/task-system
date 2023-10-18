import { prisma } from '@libs';
import { Status } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const taskSchema = z.object({
	name: z.string(),
	description: z.string(),
	dueDate: z.optional(z.coerce.date()),
	status: z.nativeEnum(Status),
	boardId: z.string(),
});

export async function POST(req: Request) {
	const body = await req.json();
	const data = await taskSchema.parseAsync(body);

	const board = await prisma.board.findFirstOrThrow({ where: { id: data.boardId } });

	const task = await prisma.task.create({
		data: {
			...data,
		},
	});

	return NextResponse.json(task, { status: 201 });
}
