import { TaskCard } from '@components';
import { ListType } from '@libs';
import { Task } from '@prisma/client';
import _ from 'lodash';
import { ReactElement } from 'react';
import { Accordion, AccordionHeader, AccordionItem, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

interface Props {
	tasks: Task[];
	onHide: () => void;
}

export default function Sidebar({ onHide, tasks }: Props): ReactElement {
	const archived = _.filter(tasks, (task) => task.archived === true);
	return (
		<Offcanvas show={true} onHide={onHide} placement="end">
			<OffcanvasHeader closeButton closeLabel="test">
				<OffcanvasTitle>Settings</OffcanvasTitle>
			</OffcanvasHeader>
			<OffcanvasBody className="p-0">
				<Accordion>
					<AccordionItem eventKey="0">
						<AccordionHeader>Labels</AccordionHeader>
						<AccordionBody></AccordionBody>
					</AccordionItem>
					<AccordionItem eventKey="1">
						<AccordionHeader>Archived</AccordionHeader>
						<AccordionBody className="px-2">
							{_.map(archived, (task) => (
								<TaskCard key={`task-${task.id}-${task.name}`} task={task} listType={ListType.ARCHIVED} />
							))}
						</AccordionBody>
					</AccordionItem>
				</Accordion>
			</OffcanvasBody>
		</Offcanvas>
	);
}
