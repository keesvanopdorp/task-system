'use client';
import { ActionButton } from '@components';
import { Board } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { Card, CardBody, FormControl, FormLabel, Modal, ModalBody, ModalHeader } from 'react-bootstrap';

export default function AddBoardCard() {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			<Card className="h-100" onClick={() => setShowModal(true)}>
				<CardBody className="d-flex justify-content-center align-items-center">Add board</CardBody>
			</Card>
			{showModal && <AddBoardModal onHide={() => setShowModal(false)} />}
		</>
	);
}

interface AddBoardModalProps {
	onHide: () => void;
}

function AddBoardModal({ onHide }: AddBoardModalProps) {
	const [name, setName] = useState<string>('');
	const router = useRouter();

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault();
			const res = await axios.post<Board>('/api/board', {
				name,
			});
			const board = res.data;
			router.replace(`/board/${board.id}`);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Modal show={true} onHide={onHide} centered>
			<ModalHeader closeButton>
				<h4>Add Board</h4>
			</ModalHeader>
			<ModalBody>
				<FormLabel>
					Board name<span className="text-danger">*</span>:
				</FormLabel>
				<FormControl defaultValue={name} onChange={(e) => setName(e.currentTarget.value)} />
				<ActionButton disabled={name.length === 0} text="Create" fullWidth className="my-2" onClick={onSubmit} />
				<ActionButton text="Cancel" variant="danger" className="my-2" fullWidth onClick={() => onHide()} />
			</ModalBody>
		</Modal>
	);
}
