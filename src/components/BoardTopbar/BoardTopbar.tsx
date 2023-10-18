'use client';

import { FontAwesomeIcon, Sidebar, StarToggle } from '@components';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Prisma } from '@prisma/client';
import { useState } from 'react';

interface Props {
	board: Prisma.BoardGetPayload<{ include: { tasks: true } }>;
}

export default function BoardTopbar({ board }: Props) {
	const [showSettings, setShowSettings] = useState<boolean>(false);

	const toggleSettings = () => setShowSettings(!showSettings);
	return (
		<>
			<div className="d-flex align-items-center justify-content-between py-1 px-3">
				<div className="d-flex align-items-center">
					<h1 className="no_selection">{board.name}</h1>
					<StarToggle className="ms-3" board={board} />
				</div>
				<div>
					<FontAwesomeIcon icon={faEllipsis} onClick={toggleSettings} />
				</div>
			</div>
			{showSettings && <Sidebar tasks={board.tasks} onHide={toggleSettings} />}
		</>
	);
}
