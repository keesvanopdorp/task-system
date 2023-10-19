'use client';

import { StarToggle } from '@components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Board } from '@prisma/client';
import Link from 'next/link';
import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';

interface Props {
	board: Board;
	className?: string;
}

export default function BoardCard({ board, className }: Props) {
	const { id, name } = board;

	return (
		<Card className={className ? className : undefined}>
			<CardBody>
				<Row>
					<Col xs={12}>
						<CardTitle className="fw-bold">{name}</CardTitle>
					</Col>
					<Col xs={12}>
						<div className="d-flex align-items-center justify-content-between">
							<Link href={`/board/${id}`} className="text-decoration-none">
								<Button variant="success" className="d-flex align-items-center">
									<span>Go to board</span>
									<FontAwesomeIcon className="ms-3" icon={faArrowRight} />
								</Button>
							</Link>
							<StarToggle board={board} />
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
}
