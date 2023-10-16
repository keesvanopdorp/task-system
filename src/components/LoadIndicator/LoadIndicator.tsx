import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadIndicator() {
	return (
		<div className="d-flex">
			<FontAwesomeIcon className="me-3" icon={faSpinner} spin />
			<h5>Loading...</h5>
		</div>
	);
}
