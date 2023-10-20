import { Translations } from './types';

const translations: Translations = {
	common: {
		task: 'task',
		'boards#zero': 'no board',
		'boards#one': 'board',
		'boards#other': 'boards',
	},
	home: {
		homepage: 'Homepage',
		allBoards: `All boards`,
		staredBoards: 'Boards with a star',
		addBoard: 'Add board',
	},
	notFound: {
		title: 'Not found',
		subtitle: 'Could not found requested resource',
		button: 'Return to home',
	},
} as const;

export default translations;
