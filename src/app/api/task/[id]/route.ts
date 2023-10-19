import { prisma } from '@libs';
import { Status } from '@prisma/client';
import { NextResponse } from 'next/server';
import z from 'zod';

interface RouteProps {
	params: {
		id: string;
	};
}

const taskPatchSchema = z
	.object({
		name: z.optional(z.string()),
		description: z.optional(z.string()),
		dueDate: z.optional(z.coerce.date().nullable()),
		status: z.optional(z.nativeEnum(Status)),
		archived: z.optional(z.boolean()),
		deleteDate: z.optional(z.boolean()),
	})
	.strict();

export type TaskSchema = z.infer<typeof taskPatchSchema>;

export async function PATCH(req: Request, { params: { id } }: RouteProps) {
	try {
		const body = await req.json();
		const data = await taskPatchSchema.parseAsync(body);
		const task = await prisma.task.update({
			where: {
				id,
			},
			data: {
				...data,
			},
		});

		if (task === null) {
			return NextResponse.json({ message: 'Error: Task not found', status: 404 }, { status: 404 });
		}

		return NextResponse.json(task, { status: 200 });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: (e as Error).message, status: 500 }, { status: 500 });
	}
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
