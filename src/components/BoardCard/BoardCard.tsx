'use client';

import { StarToggle } from '@components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Board } from '@prisma/client';
import Link from 'next/link';
import { Button, Card, CardBody, CardText, CardTitle } from 'react-bootstrap';

interface Props {
	board: Board;
}

export default function BoardCard({ board }: Props) {
	let { id, name, description } = board;

	return (
		<Card>
			<CardBody>
				<CardTitle className="fw-bold">{name}</CardTitle>
				<CardText>{description}</CardText>
				<div className="d-flex align-items-center justify-content-between">
					<Link href={`/board/${id}`} className="text-decoration-none">
						<Button variant="success" className="d-flex align-items-center">
							<span>Go to board</span>
							<FontAwesomeIcon className="ms-3" icon={faArrowRight} />
						</Button>
					</Link>
					<StarToggle board={board} />
				</div>
			</CardBody>
		</Card>
	);
}
