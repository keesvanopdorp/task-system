'use client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Card, CardBody, FormControl } from 'react-bootstrap';

interface Props {}

export default function AddTaskCard({}: Props) {
	const [addTask, setAddTask] = useState<boolean>(false);

	return (
		<>
			{addTask !== false ? (
				<FormControl onBlur={() => setAddTask(false)} as="textarea" />
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
