import { BoardCard, Col, Row } from '@components';
import { prisma } from '@libs';
import { Board } from '@prisma/client';
import _ from 'lodash';

export default async function Home() {
	const boards = await prisma.board.findMany({ include: { tasks: false } });
	const staredBoards = _.filter(boards, (board: Board) => board.stared === true);

	return (
		<>
			<h1 className="w-100 text-center mt-4">Homepage</h1>
			<h3>Boards with a star</h3>
			<Row className="my-3">
				{_.map(staredBoards, (board: Board) => {
					const { id, name } = board;
					return (
						<Col key={`board-${id}-${name}`} xs={12} md={2}>
							<BoardCard board={board} />
						</Col>
					);
				})}
			</Row>
			<h3>All Boards</h3>
			<Row className="my-3">
				{_.map(boards, (board: Board) => {
					const { id, name } = board;
					return (
						<Col key={`board-${id}-${name}`} xs={12} md={2}>
							<BoardCard board={board} />
						</Col>
					);
				})}
			</Row>
		</>
	);
}
