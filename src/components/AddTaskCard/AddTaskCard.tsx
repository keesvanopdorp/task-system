'use client';
import { ActionButton } from '@components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Status, Task } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FocusEvent, MouseEvent, useRef, useState } from 'react';
import { Card, CardBody, FormControl } from 'react-bootstrap';

interface Props {
	status: Status;
	boardId: string;
}

export default function AddTaskCard({ status, boardId }: Props) {
	const [addTask, setAddTask] = useState<boolean>(false);
	const router = useRouter();
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault();
			const inputValue = inputRef.current?.value as string;
			setAddTask(false);
			if (inputValue.length > 0) {
				await axios.post<Task>('/api/task', { name: inputValue, boardId, status });
				router.refresh();
			}
		} catch (e) {
			console.error(e);
		}
	};

	const onBlur = async (e: FocusEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		const inputValue = inputRef.current?.value as string;
		if (inputValue.trim().length < 1) {
			setAddTask(false);
		}
	};

	return (
		<>
			{addTask !== false ? (
				<>
					<FormControl onBlur={onBlur} as="textarea" rows={2} ref={inputRef} />
					<div className="d-flex w-100 mt-3">
						<ActionButton className="w-50 me-2" text="Cancel" variant="danger" onClick={() => setAddTask(false)} />
						<ActionButton className="w-50 ms-4" text="Save" variant="success" onClick={onSubmit} />
					</div>
				</>
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
