'use client';
import { FontAwesomeIcon } from '@components';
import { faStar as faRregularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { Board } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CSSProperties, MouseEvent } from 'react';

interface Props {
	className?: string;
	style?: CSSProperties | undefined;
	board: Board;
}

export default function StarToggle({ board, ...rest }: Props) {
	const router = useRouter();
	const onToggleStared = async (board: Board, e: MouseEvent<SVGSVGElement>): Promise<void> => {
		e.preventDefault();
		e.stopPropagation();
		try {
			const res = await axios.patch<Board>(`/api/board/${board.id}`, { stared: !board.stared });
			const newBoard = res.data;

			if (newBoard !== board) {
				router.refresh();
			}
		} catch (e) {
			console.error(e);
		}
	};

	const { stared } = board;
	return (
		<FontAwesomeIcon
			{...rest}
			onClick={(e) => onToggleStared(board, e)}
			size="2x"
			icon={stared ? faSolidStar : faRregularStar}
			color={stared ? '#FFD700' : '#666'}
		/>
	);
}
