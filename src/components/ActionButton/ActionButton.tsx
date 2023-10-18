'use client';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

interface Props extends ButtonProps {
	icon?: IconDefinition;
	text?: string;
	fullWidth?: boolean;
}

export default function ActionButton({ variant, icon, text, className = '', fullWidth = false, ...rest }: Props): ReactElement {
	return (
		<Button className={`d-flex align-items-center px-1 ${className} ${fullWidth ? 'w-100' : ''}`} variant={variant} {...rest}>
			{icon && <FontAwesomeIcon className={`${text !== undefined ? 'me-1' : ''}`} icon={icon} />}
			{text && <div className={`text-nowrap ${icon === undefined ? 'w-100 text-center' : ''}`}>{text}</div>}
		</Button>
	);
}
