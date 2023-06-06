import { Container, Row, Col } from 'react-bootstrap';

export default function FormContainer({ children }) {
	return (
		<Container>
			<Row className='justify-content-md-center mt-5'>
				<Col xs={12} md={6}>
					{children}
				</Col>
			</Row>
		</Container>
	);
}
