import '@app/global.scss';
import { CustomNavbar } from '@components';
import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<CustomNavbar />
				<Container fluid>{children}</Container>
			</body>
		</html>
	);
}
