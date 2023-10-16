'use client';
import Link from 'next/link';
import { Container, Nav, NavLink, Navbar, NavbarBrand } from 'react-bootstrap';

export default function CustomNavbar() {
	return (
		<Navbar data-bs-theme="dark" className="bg-dark">
			<Container fluid>
				<NavbarBrand>Task system</NavbarBrand>
				<Nav>
					<NavLink as={Link} href="/">
						Home
					</NavLink>
				</Nav>
			</Container>
		</Navbar>
	);
}
