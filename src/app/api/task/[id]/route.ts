import { prisma } from '@libs';
import { Status } from '@prisma/client';
import { NextResponse } from 'next/server';
import z from 'zod';

interface PATCH {
	params: {
		id: string;
	};
}

const taskPatchSchema = z.object({
	name: z.optional(z.string()),
	description: z.optional(z.string()),
	dueDate: z.optional(z.date()),
	status: z.optional(z.nativeEnum(Status)),
	archived: z.optional(z.boolean()),
});

export async function PATCH(req: Request, { params: { id } }: PATCH) {
	const body = await req.json();
	const data = await taskPatchSchema.parseAsync(body);

	const task = await prisma.task.update({
		where: {
			id: id,
		},
		data,
	});

	if (task === null) {
		return NextResponse.json({ message: 'Error: Board not found', status: 404 }, { status: 404 });
	}

	return NextResponse.json(task, { status: 200 });
}
