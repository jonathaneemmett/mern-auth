import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.auth);

	const [logoutApiCall] = useLogoutMutation();

	async function logoutHandler() {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate('/');
			toast.success('Logged out successfully.');
		} catch (err) {
			toast.error(err.message);
		}
	}
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>MERN Auth</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							{userInfo ? (
								<>
									<NavDropdown
										title={userInfo.name}
										id='username'>
										<LinkContainer to='/profile'>
											<NavDropdown.Item>
												Profile
											</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item
											onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<>
									<LinkContainer to='/login'>
										<Nav.Link>
											<FaSignInAlt /> Sign In
										</Nav.Link>
									</LinkContainer>
									<LinkContainer to='/register'>
										<Nav.Link>
											<FaSignOutAlt /> Sign Up
										</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
