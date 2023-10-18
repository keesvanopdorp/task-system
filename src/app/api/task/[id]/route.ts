import { prisma } from '@libs';
import { Status } from '@prisma/client';
import { NextResponse } from 'next/server';
import z from 'zod';

interface RouteProps {
	params: {
		id: string;
	};
}

const taskPatchSchema = z.object({
	name: z.optional(z.string()),
	description: z.optional(z.string()),
	dueDate: z.optional(z.coerce.date().or(z.literal('null'))),
	status: z.optional(z.nativeEnum(Status)),
	archived: z.optional(z.boolean()),
	deleteDate: z.optional(z.boolean()),
});

export async function PATCH(req: Request, { params: { id } }: RouteProps) {
	const body = await req.json();
	const data = await taskPatchSchema.parseAsync(body);

	let dueDate;
	switch (typeof data.dueDate) {
		case 'string':
			dueDate = null;
			break;
		case 'undefined':
			dueDate = undefined;
			break;
		case 'object':
			dueDate = data.dueDate;
	}

	const task = await prisma.task.update({
		where: {
			id,
		},
		data: {
			...data,
			dueDate,
		},
	});

	if (task === null) {
		return NextResponse.json({ message: 'Error: Task not found', status: 404 }, { status: 404 });
	}

	return NextResponse.json(task, { status: 200 });
}

export async function DELETE(req: Request, { params: { id } }: RouteProps) {
	try {
		const task = await prisma.task.delete({ where: { id } });
		if (task === null) {
			return NextResponse.json({ message: 'Error: Task not found', status: 404 }, { status: 404 });
		}
		return NextResponse.json(task, { status: 200 });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: 'Error: Something go wrong on the server', status: 500 }, { status: 500 });
	}
}
