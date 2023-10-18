'use client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Status, Task } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FocusEvent, useState } from 'react';
import { Card, CardBody, FormControl } from 'react-bootstrap';

interface Props {
	status: Status;
	boardId: string;
}

export default function AddTaskCard({ status, boardId }: Props) {
	const [addTask, setAddTask] = useState<boolean>(false);
	const router = useRouter();

	const onBlur = async (e: FocusEvent<HTMLTextAreaElement>) => {
		try {
			e.preventDefault();
			const inputValue = e.currentTarget.value;
			setAddTask(false);
			if (inputValue.length > 0) {
				const res = await axios.post<Task>('/api/task', { name: inputValue, boardId, status });
				const task = res.data;
				router.refresh();
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			{addTask !== false ? (
				<FormControl onBlur={onBlur} as="textarea" rows={2} />
			) : (
				<Card onClick={() => setAddTask(!addTask)}>
					<CardBody>
						<FontAwesomeIcon icon={faPlus} className="me-2" /> Add Task...
					</CardBody>
				</Card>
			)}
		</>
	);
}
