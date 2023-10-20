import { Translations } from './types';

const translations: Translations = {
	common: {
		task: 'taak',
		'boards#zero': 'geen bord',
		'boards#one': 'bord',
		'boards#other': 'borden',
	},
	home: {
		homepage: 'Homepagina',
		allBoards: `Alle borden`,
		staredBoards: 'Borden met een ster',
		addBoard: 'Bord toevoegen',
	},
	notFound: {
		title: 'Niet gevonden',
		subtitle: 'Kon de opgevraagde pagina niet vinden',
		button: 'Terug naar homepagina',
	},
} as const;

export default translations;
