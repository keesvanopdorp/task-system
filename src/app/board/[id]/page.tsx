import { AddTaskCard, BoardTopbar, Col, Row, TaskCard } from '@components';
import { ListType, prisma } from '@libs';
import { Status } from '@prisma/client';
import _ from 'lodash';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { validate as uuidValidate } from 'uuid';

interface PageProps {
	params: {
		id: string;
	};
	children?: ReactNode;
}

export default async function ShowBoard({ params: { id }, children }: PageProps) {
	if (!uuidValidate(id)) notFound();

	const board = await prisma.board.findFirstOrThrow({ where: { id }, include: { tasks: true } }).catch((e) => {
		console.log(e);
		notFound();
	});

	const { tasks } = board;
	const entries = Object.entries(Status);
	const col = 12 / entries.length;

	return (
		<div className="pt-1">
			<BoardTopbar board={board} />
			<Row className="mt-3">
				{_.map(entries, ([key, value]: [string, keyof typeof Status]) => {
					const filtered = _.filter(tasks, (task) => task.status === Status[value] && task.archived !== true);
					return (
						<Col key={`col-${key}`} md={col}>
							<h3 className="text-center">{`${key.substring(0, 1).toLowerCase()}${key.substring(1).toLowerCase()}`}</h3>
							{_.map(filtered, (task) => (
								<TaskCard key={`task-${task.id}-${task.name}`} task={task} listType={ListType.GRID} />
							))}
							<AddTaskCard boardId={board.id} status={Status[value]} />
						</Col>
					);
				})}
			</Row>
			{children && children}
		</div>
	);
}
