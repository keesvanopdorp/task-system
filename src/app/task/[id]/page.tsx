import ShowBoard from '@app/board/[id]/page';
import { TaskModal } from '@components';
import { prisma } from '@libs';
import { notFound } from 'next/navigation';
import { validate as uuidValidate } from 'uuid';

interface PageProps {
	params: {
		id: string;
	};
}

export default async function ShowTask({ params: { id } }: PageProps) {
	if (!uuidValidate(id)) notFound();

	const task = await prisma.task.findFirstOrThrow({ where: { id }, include: { board: true } }).catch((e) => notFound());
	const { board } = task;

	return (
		<>
			<ShowBoard params={{ id: board.id }} />
			<TaskModal task={task} />
		</>
	);
}
