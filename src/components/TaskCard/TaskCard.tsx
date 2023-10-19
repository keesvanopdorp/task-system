'use client';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListType, TaskCardProps } from '@libs';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from 'react-bootstrap';

export default function TaskCard({ task, listType, className, ...rest }: TaskCardProps): ReactElement {
	const { name, description, status, dueDate } = task;

	const getStatusCol = (listType: ListType.ARCHIVED | ListType.LIST): number => {
		switch (listType) {
			case ListType.ARCHIVED:
				return 6;
			case ListType.LIST:
				return 2;
		}
	};

	const getDateCol = (listType: ListType): number => {
		switch (listType) {
			case ListType.ARCHIVED:
				return 7;
			case ListType.GRID:
				return 4;
			case ListType.LIST:
				return 2;
		}
	};

	return (
		<Link href={`/task/${task.id}`} className="text-decoration-none">
			<Card className={`${className ? className : ''} my-3`} draggable={'true'} {...rest}>
				<CardBody>
					<CardTitle>{name}</CardTitle>
					<CardSubtitle style={{ whiteSpace: 'pre-wrap' }}>{description}</CardSubtitle>
					<Row className="my-2 w-100">
						{(listType === ListType.LIST || listType === ListType.ARCHIVED) && (
							<Col xs={6} md={getStatusCol(listType)}>
								<CardText>
									<span className="fw-bold me-1">Status:</span> <i>{status}</i>
								</CardText>
							</Col>
						)}
						{dueDate && (
							<Col xs={7} md={getDateCol(listType)}>
								<CardText className={`${new Date(Date.now()) > dueDate ? 'text-danger' : 'text-secondary'}`}>
									<FontAwesomeIcon icon={faClock} className="me-2" />
									<i>{dueDate.toDateString()}</i>
								</CardText>
							</Col>
						)}
					</Row>
				</CardBody>
			</Card>
		</Link>
	);
}
