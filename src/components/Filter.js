import { Fragment, useContext } from 'react';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Filter(prop){

	const { setFilterInput } = useContext(UserContext);

	return (
		<Row>
			<Col className="p-5"> 
				<InputGroup className="mb-3 col-md-6">
				    <Form.Control
				      placeholder="Search"
				      aria-label="Username"
				      aria-describedby="basic-addon1"
				      onChange={(e) => {
				      	setFilterInput(e.target.value)
				      	
				      }}
				    />
				</InputGroup>
					
			</Col>
		</Row>
	)
}