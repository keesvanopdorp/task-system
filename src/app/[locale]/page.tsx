import { AddBoardCard, BoardCard, Col, Row } from '@components';
import { prisma } from '@libs';
import { getI18n } from '@locales/server';
import { Board } from '@prisma/client';
import _ from 'lodash';

export default async function Home() {
	const t = await getI18n();
	const boards = await prisma.board.findMany({ include: { tasks: false } });
	const staredBoards = _.filter(boards, (board: Board) => board.stared === true);

	return (
		<>
			<h1 className="w-100 text-center mt-4">{t('home.homepage')}</h1>
			<h3>{t('home.staredBoards')}</h3>
			<Row className="my-3">
				{_.map(staredBoards, (board: Board) => {
					const { id, name } = board;
					return (
						<Col key={`board-${id}-${name}`} xs={12} md={2}>
							<BoardCard board={board} className="h-100" />
						</Col>
					);
				})}
			</Row>
			<h3>{t('home.allBoards')}</h3>
			<Row className="my-3">
				{_.map(boards, (board: Board) => {
					const { id, name } = board;
					return (
						<Col key={`board-${id}-${name}`} xs={12} md={2}>
							<BoardCard board={board} className="h-100" />
						</Col>
					);
				})}
				<Col md={2} xs={12}>
					<AddBoardCard />
				</Col>
			</Row>
		</>
	);
}
