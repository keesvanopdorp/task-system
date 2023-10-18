'use client';
import { ActionButton } from '@components';
import { faArrowRight, faBoxArchive, faClock, faCopy, faEdit, faInfoCircle, faMinus, faRedo, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Status, Task } from '@prisma/client';
import axios from 'axios';
import _ from 'lodash';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FocusEvent, ReactElement, ReactNode, useEffect, useState } from 'react';
import { Col, Form, FormControl, Modal, ModalBody, ModalHeader, ModalProps, Row } from 'react-bootstrap';

interface Props {
	task: Task;
}

async function sendPatchRequest(body: any, task: Task, router: AppRouterInstance) {
	const res = await axios.patch<Task>(`/api/task/${task.id}`, body);
	const data = res.data;
	if (data !== task) {
		router.refresh();
	}
}

export default function TaskModal({ task }: Props): ReactElement {
	const [descriptionIsPresent, setDescriptionIsPresent] = useState<boolean>(false);
	const [editDescription, setEditDescription] = useState<boolean>(descriptionIsPresent);
	const [editName, setEditName] = useState<boolean>(false);
	const [editStatus, setEditStatus] = useState<boolean>(false);
	const [copyTask, setCopyTask] = useState<boolean>(false);
	const [editDate, setEditDate] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(1920);

	useEffect(() => {
		const descriptionIsPresent = !(task.description === null);
		setDescriptionIsPresent(descriptionIsPresent);
		if (descriptionIsPresent !== true) setEditDescription(true);
		setShow(true);
		setWidth(window.innerWidth);
	}, [task.description, editDescription, show, width]);

	const router = useRouter();

	const onCloseModal = () => {
		router.replace(`/board/${task.boardId}`);
	};

	const onArchive = async () => {
		try {
			await sendPatchRequest({ archived: !task.archived }, task, router);
		} catch (e) {
			console.error(e);
		}
	};

	const onNameEditBlur = async (e: FocusEvent<HTMLInputElement>) => {
		try {
			e.preventDefault();
			setEditName(false);
			const inputValue = e.currentTarget.value;
			if (task.name !== inputValue) {
				await sendPatchRequest({ name: inputValue }, task, router);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const onDelete = async () => {
		try {
			const res = await axios.delete(`/api/task/${task.id}`);
			router.replace(`/board/${task.boardId}`);
		} catch (e) {
			console.error(e);
		}
	};

	const onDescriptionBlur = async (e: FocusEvent<HTMLTextAreaElement>) => {
		try {
			e.preventDefault();
			setEditDescription(false);
			const inputValue = e.currentTarget.value;
			if (task.description !== inputValue) {
				await sendPatchRequest({ description: e.currentTarget.value }, task, router);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const { name, description, archived, dueDate } = task;
	return (
		<Modal size={width < 1920 ? 'xl' : 'lg'} show={show} onHide={onCloseModal} centered className="px-2">
			<ModalHeader closeButton>
				{editName !== true ? (
					<div className="w-100" onClick={() => setEditName(!editName)}>
						{name}
					</div>
				) : (
					<FormControl onBlur={onNameEditBlur} defaultValue={name} />
				)}
			</ModalHeader>
			<ModalBody className="px-4">
				<Row>
					<Col xs={12} md={10}>
						<Row>
							{dueDate !== null && (
								<Col xs={12}>
									Date:
									<FontAwesomeIcon icon={faClock} className="mx-2" />
									{dueDate?.toDateString()}
								</Col>
							)}
							<Col xs={1} className="mt-2">
								<FontAwesomeIcon icon={faInfoCircle} size="1x" />
							</Col>
							<Col xs={7} md={9} className="mt-2">
								<h6 className="fw-bold">Description</h6>
							</Col>
							<Col xs={3} md={2} className="mt-2">
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
									<FormControl
										onBlur={onDescriptionBlur}
										as="textarea"
										placeholder={descriptionIsPresent !== true ? 'Add a description' : undefined}
										rows={4}
										defaultValue={description !== null ? description : ''}
									/>
								)}
							</Col>
						</Row>
					</Col>
					<Col xs={12} md={2} className="d-flex flex-column">
						<Row>
							<Col xs={6} md={12}>
								<h6 className="fw-bold text-center">Add to card</h6>
								<ActionButton
									icon={faClock}
									text="Date"
									variant="secondary"
									className="my-1"
									fullWidth
									onClick={() => setEditDate(!editDate)}
								/>
								{editDate && <DateModal task={task} onHide={() => setEditDate(false)} />}
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
										<ActionButton
											className="my-1"
											icon={faMinus}
											text="Delete"
											variant="danger"
											fullWidth
											onClick={() => onDelete()}
										/>
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

interface CustomModalProps extends Props {
	onHide: () => void;
}

function EditStatusModal({ task, onHide }: CustomModalProps) {
	const [currentStatus, setCurrentStatus] = useState<Status>(Status[task.status]);
	const router = useRouter();

	const onClick = async () => {
		try {
			await sendPatchRequest({ status: currentStatus }, task, router);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<EditModal title="Move task" onHide={onHide}>
			<>
				<StatusSelect onChange={(e) => setCurrentStatus(Status[e.currentTarget.value as keyof typeof Status])} defaultValue={currentStatus} />
				<ActionButton variant="success" text="Move" fullWidth className="mt-3" onClick={() => onClick()} />
			</>
		</EditModal>
	);
}

function CopyModal({ task, onHide }: CustomModalProps) {
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
				dueDate: task.dueDate,
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
		<EditModal onHide={onHide} title="Copy task">
			<>
				<FormControl defaultValue={task.name} onChange={(e) => setCurrentName(e.currentTarget.value)} className="my-2" />
				<StatusSelect onChange={(e) => setCurrentStatus(Status[e.currentTarget.value as keyof typeof Status])} defaultValue={currentStatus} />
				<ActionButton variant="success" text="Copy" fullWidth className="mt-3" onClick={() => onClick()} />
			</>
		</EditModal>
	);
}

function DateModal({ task, onHide }: CustomModalProps) {
	const [newDate, setNewDate] = useState<Date | null>(null);
	const router = useRouter();

	const onClick = async () => {
		try {
			console.log({ dueDate: newDate !== null ? newDate.toISOString() : 'null' });
			await sendPatchRequest({ dueDate: newDate !== null ? newDate.toISOString() : 'null' }, task, router);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<EditModal onHide={onHide} title="Add date">
			<>
				<FormControl
					type="date"
					defaultValue={task.dueDate ? task.dueDate.toISOString().substring(0, 10) : undefined}
					onChange={(e) => setNewDate(new Date(Date.parse(e.currentTarget.value)))}
				/>
				<ActionButton text="save" variant="success" onClick={() => onClick()} fullWidth className="my-2" />
				<ActionButton text="Delete" variant="danger" fullWidth onClick={() => onClick()} />
			</>
		</EditModal>
	);
}

interface EditModalProps {
	onHide: () => void;
	title: string;
	size?: ModalProps['size'];
	children: ReactNode;
}

function EditModal({ onHide, title, children, size = 'sm' }: EditModalProps) {
	return (
		<Modal
			onHide={onHide}
			size={size}
			backdropClassName="custom-modal-backdrop"
			style={{ zIndex: 999999, position: 'absolute', left: '500px', bottom: '50px' }}
			show={true}
			centered>
			<ModalHeader closeButton>
				<h5>{title}</h5>
			</ModalHeader>
			<ModalBody>{children}</ModalBody>
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
