'use client';
import { ActionButton } from '@components';
import { faArrowRight, faBoxArchive, faClock, faCopy, faEdit, faInfoCircle, faMinus, faRedo, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Status, Task } from '@prisma/client';
import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { ChangeEvent, ReactElement, useState } from 'react';
import { Col, Form, FormControl, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap';

interface Props {
	task: Task;
}

export default function TaskModal({ task }: Props): ReactElement {
	const [editDescription, setEditDescription] = useState<boolean>(false);
	const [editName, setEditName] = useState<boolean>(false);
	const [editStatus, setEditStatus] = useState<boolean>(false);
	const [copyTask, setCopyTask] = useState<boolean>(false);

	const router = useRouter();

	const onCloseModal = () => {
		router.replace(`/board/${task.boardId}`);
	};

	const onArchive = async () => {
		try {
			const res = await axios.patch<Task>(`/api/task/${task.id}`, { archived: !task.archived });
			const newTask = res.data;

			if (newTask !== task) {
				router.refresh();
			}
		} catch (e) {
			console.error(e);
		}
	};

	const { name, description, archived, dueDate } = task;
	return (
		<Modal
			size={'lg'}
			backdrop={editStatus == true || copyTask === true ? false : true}
			show={true}
			onHide={onCloseModal}
			centered
			className="px-2">
			<ModalHeader closeButton>
				{editName !== true ? (
					<div className="w-100" onClick={() => setEditName(!editName)}>
						{name}
					</div>
				) : (
					<FormControl onBlur={() => setEditName(false)} value={name} />
				)}
			</ModalHeader>
			<ModalBody className="px-4">
				<Row>
					<Col xs={12} md={10}>
						<Row>
							<Col xs={1}>
								<FontAwesomeIcon icon={faInfoCircle} size="1x" />
							</Col>
							<Col xs={7} md={9}>
								<h6 className="fw-bold">Description</h6>
							</Col>
							<Col xs={3} md={2}>
								<ActionButton
									fullWidth
									onClick={() => setEditDescription(!editDescription)}
									text="edit"
									icon={faEdit}
									variant="secondary"
								/>
							</Col>
							<Col xs={{ span: 11, offset: 1 }} className="mt-2 my-4">
								{editDescription !== true ? (
									<h6 onClick={() => setEditDescription(true)}>{description}</h6>
								) : (
									<FormControl onBlur={() => setEditDescription(false)} as="textarea" rows={4} value={description} />
								)}
							</Col>
							<Col>
								Date <FontAwesomeIcon icon={faClock} />
								{dueDate?.toDateString()}
							</Col>
						</Row>
					</Col>
					<Col xs={12} md={2} className="d-flex flex-column">
						<Row>
							<Col xs={6} md={12}>
								<h6 className="fw-bold text-center">Add to card</h6>
								<ActionButton icon={faClock} text="Date" variant="secondary" className="my-1" fullWidth />
								<ActionButton icon={faTags} text="Labels" variant="secondary" className="my-1" fullWidth />
							</Col>
							<Col xs={6} md={12}>
								<h6 className="fw-bold text-center my-2">Acties</h6>
								<ActionButton
									icon={faArrowRight}
									text="Move"
									variant="secondary"
									className="my-1"
									fullWidth
									onClick={() => setEditStatus(!editStatus)}
								/>
								{editStatus && <EditStatusModal task={task} onHide={() => setEditStatus(false)} />}
								<ActionButton
									icon={faCopy}
									text="Copy"
									variant="secondary"
									className="my-1"
									fullWidth
									onClick={() => setCopyTask(!copyTask)}
								/>
								{copyTask && <CopyModal task={task} onHide={() => setCopyTask(false)} />}
								{archived ? (
									<>
										<ActionButton
											icon={faRedo}
											text="Send back"
											className="my-1"
											variant="secondary"
											fullWidth
											onClick={() => onArchive()}
										/>
										<ActionButton className="my-1" icon={faMinus} text="Delete" variant="danger" fullWidth />
									</>
								) : (
									<ActionButton
										icon={faBoxArchive}
										text="Archive"
										variant="secondary"
										className="my-1"
										fullWidth
										onClick={() => onArchive()}
									/>
								)}
							</Col>
						</Row>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
}

interface ModalProps extends Props {
	onHide: () => void;
}

function EditStatusModal({ task, onHide }: ModalProps) {
	const [currentStatus, setCurrentStatus] = useState<Status>(Status[task.status]);
	const router = useRouter();

	const onClick = async () => {
		try {
			const res = await axios.patch<Task>(`/api/task/${task.id}`, { status: currentStatus });
			const newTask = res.data;

			if (newTask !== task) {
				router.refresh();
			}
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<Modal
			backdropClassName="custom-modal-backdrop"
			style={{ zIndex: 999999, position: 'absolute', left: '500px', bottom: '50px' }}
			show={true}
			size="sm"
			centered
			onHide={onHide}>
			<ModalHeader closeButton>
				<h4 className="text-center">Move task</h4>
			</ModalHeader>
			<ModalBody>
				<StatusSelect onChange={(e) => setCurrentStatus(Status[e.currentTarget.value as keyof typeof Status])} defaultValue={currentStatus} />
				<ActionButton variant="success" text="Move" fullWidth className="mt-3" onClick={() => onClick()} />
			</ModalBody>
		</Modal>
	);
}

function CopyModal({ task, onHide }: ModalProps) {
	const [currentStatus, setCurrentStatus] = useState<Status>(Status[task.status]);
	const [currentName, setCurrentName] = useState<string>(task.name);

	const router = useRouter();

	const onClick = async () => {
		try {
			const res = await axios.post<Task>(`/api/task`, {
				status: currentStatus,
				name: currentName,
				description: task.description,
				boardId: task.boardId,
			});
			const newTask = res.data;

			if (newTask !== task) {
				router.replace(`/task/${newTask.id}`);
			}
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<Modal
			backdropClassName="custom-modal-backdrop"
			style={{ zIndex: 999999, position: 'absolute', left: '500px', bottom: '50px' }}
			show={true}
			size="sm"
			centered
			onHide={onHide}>
			<ModalBody>
				<ModalHeader closeButton>
					<h4 className="text-center">Copy task</h4>
				</ModalHeader>
				<FormControl defaultValue={task.name} onChange={(e) => setCurrentName(e.currentTarget.value)} className="my-2" />
				<StatusSelect onChange={(e) => setCurrentStatus(Status[e.currentTarget.value as keyof typeof Status])} defaultValue={currentStatus} />
				<ActionButton variant="success" text="Copy" fullWidth className="mt-3" onClick={() => onClick()} />
			</ModalBody>
		</Modal>
	);
}

interface StatusSelectProps {
	defaultValue?: any;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function StatusSelect({ defaultValue, onChange }: StatusSelectProps) {
	return (
		<Form.Select defaultValue={defaultValue} onChange={onChange}>
			{_.map(Object.keys(Status), (key: keyof typeof Status) => (
				<option key={`status-${key}`} value={key}>{`${key.substring(0, 1)}${key.substring(1).toLowerCase()}`}</option>
			))}
		</Form.Select>
	);
}
