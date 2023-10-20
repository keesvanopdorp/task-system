import '@app/global.scss';
import { CustomNavbar } from '@components';
import { Nunito_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

const nunitoSans = Nunito_Sans({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={nunitoSans.className}>
				<CustomNavbar />
				<Container fluid>{children}</Container>
			</body>
		</html>
	);
}
