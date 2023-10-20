import { Button, FontAwesomeIcon } from '@components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getI18n } from '@locales/server';
import Link from 'next/link';

export default async function NotFound() {
	const t = await getI18n();

	return (
		<div className="d-flex align-items-center justify-content-center overflow-hidden vh-100 flex-column">
			<h1>404 - {t('notFound.title')}</h1>
			<h6>{t('notFound.subtitle')}</h6>
			<Link href="/" className="text-decoration-none">
				<Button className="d-flex align-items-center" variant="danger">
					<FontAwesomeIcon icon={faArrowLeft} className="me-3" />
					{t('notFound.button')}
				</Button>
			</Link>
		</div>
	);
}
