import { Task } from '@prisma/client';
import { CSSProperties } from 'react';

export { default as prisma } from './prisma';

export enum ListType {
	GRID,
	LIST,
	ARCHIVED,
}

export interface TaskCardProps {
	task: Task;
	// onTaskClick: OnTaskClick;
	listType: ListType;
	className?: string;
	style?: CSSProperties;
}

export type OnTaskClick = (task: Task) => void;
