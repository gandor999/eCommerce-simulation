import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Login(props){

	const {user, setUser} = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);


	function authenticate(e){
		e.preventDefault();

		fetch('http://tranquil-sierra-40350.herokuapp.com/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);


			if(typeof data.access !== "undefined"){
				localStorage.setItem('token', data.access);
				localStorage.setItem('cart', JSON.stringify([]));
				retrieveUserDetails(data.access);

				Swal.fire({
					title: "Login Successful",
					icon: "Success",
					text: "Welcome!"
				})


			}
			else{
				Swal.fire({
					title: "Authentication failed",
					icon: "error",
					text: "Check your login details and try again"
				})
			}
		})
	

		setEmail('');
		setPassword('');
	}


	const retrieveUserDetails = (token) => {
		fetch('http://tranquil-sierra-40350.herokuapp.com/users/details', {
			headers: {
				Authorization: `Bearer ${ token }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setUser({
				id: data._id,
				isAdmin: data.isAdmin,
				token: token
			})
		})
	}

	useEffect(() => {
		if(email !== '' && password !== ''){
			setIsActive(true);
		}
		else{
			setIsActive(false);
		}
	}, [email, password]);


	return (
		
		(user.id !== null) ?
			<Redirect to="/" />
			:
			<Form className="mt-3 pt-5 mt-5" onSubmit={e => authenticate(e)}>
				<Form.Group className="col-md-6 col-12">
				  <Form.Group className="mb-5">
				  	<h1>Login</h1>
				  </Form.Group>
					
			      {/*Bind the input states via 2-way binding*/}
				  <Form.Group className="pl-3 mb-4" controlId="userEmail">
				  	
				    <Form.Control 
				    	type="email" 
				    	placeholder="Enter email"
				    	value={email}
				    	className="rounded-pill"
				    	onChange={ e => setEmail(e.target.value) }
				    	required 
				    />
				  </Form.Group>

				  <Form.Group className="mt-2 pl-3" controlId="password">
				    
				    <Form.Control 
				    	type="password" 
				    	placeholder="Password"
				    	value={password}
				    	className="rounded-pill"
				    	onChange={ e => setPassword(e.target.value) }
				    	required 
				    />
				  </Form.Group>

				  <Form.Group className="pl-3 mt-4 text-right">
				  	{ isActive ? 
				  			<Button  className="mt-3 accept rounded-pill" variant="warning" type="submit" id="submitBtn">
				  			  Login
				  			</Button>
				  			: 
				  			<Button  className="mt-3 rounded-pill" variant="secondary" type="submit" id="submitBtn" disabled>
				  			  Login
				  			</Button>
				  	}
				  </Form.Group>

				  <Form.Group>
				  	<Form.Text className=" pl-3">
				  	  No account yet? 
				  	  <Link className="text-warning" to="/register"> Register</Link> here
				  	</Form.Text>
				  </Form.Group>
				</Form.Group> 
			</Form>
	)
}