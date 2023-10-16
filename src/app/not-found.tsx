import { FontAwesomeIcon } from '@components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function NotFound() {
	return (
		<div className="d-flex align-items-center justify-content-center overflow-hidden vh-100 flex-column">
			<h1>404 - Page not Found</h1>
			<h6>Could not find requested resource</h6>
			<Link href="/" className="text-decoration-none">
				<Button className="d-flex align-items-center" variant="danger">
					<FontAwesomeIcon icon={faArrowLeft} className="me-3" />
					Return to home
				</Button>
			</Link>
		</div>
	);
}
