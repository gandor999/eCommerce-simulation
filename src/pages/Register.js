import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import Login from './Login';


export default function Register(){

	
	let history = useHistory();

	const { api } = useContext(UserContext);

	const [firstName, setfirstName] = useState('');
	const [lastName, setlastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setmobile] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');


	// State to determine whether the submit button is enabled or not

	const [isActive, setIsActive] = useState(false);   // This is a state hook

	// Function to simulate user registration
	function registerUser(e){
		e.preventDefault();

		fetch(`${api}/users/register`, {
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				contactNo: mobile,
				password: password1
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(!data.duplicate){
				setfirstName('');
				setlastName('');
				setmobile('');
				setEmail('');
				setPassword1('');
				setPassword2('');

				Swal.fire({
					title: "Registration Successful",
					icon: "success",
					text: "Welcome!"
				})

				history.push(`/login`)

			}
			else if(data.reason == 'email'){
				Swal.fire({
					title: "Duplicate email found",
					icon: "error",
					text: "Please provide a different email"
				})
			}
			else if(data.reason == 'mobile'){
				Swal.fire({
					title: "Duplicate mobile number found",
					icon: "error",
					text: "Please provide a different mobile number"
				})
			}
		})

		
	}


	useEffect(() => { 
		if((email !== '' && password1 !== '' && password2 !== '' && firstName !== '' && lastName !== '' && mobile.length === 11) && (password1 === password2)){
			setIsActive(true);
		}
		else{
			setIsActive(false);
		}
	}, [email, password1, password2, lastName, firstName, mobile]);

	

	// Decontruct usercontext here
	const { user } = useContext(UserContext); 

	return (

		(user.id == null) ?
				<Form className="" onSubmit={e => registerUser(e)}>
			      {/*Bind the input states via 2-way binding*/}

			      <Form.Group className="mt-5 pt-5 pl-2">
			      	<h1>Register</h1>
			      </Form.Group>

			      <Form.Group className="p-4 col-md-6 ">
		      	      <Form.Group controlId="firstName">
		      	        <Form.Control 
		      	        	type="text" 
		      	        	placeholder="Enter First Name"
		      	        	value={firstName}
		      	        	onChange={ e => setfirstName(e.target.value) }
		      	        	className="rounded-pill"
		      	        	required 
		      	        />
		      	      </Form.Group>

		      	      <Form.Group className="mt-3" controlId="lastName">
		      	        <Form.Control 
		      	        	type="text" 
		      	        	placeholder="Enter Last Name"
		      	        	value={lastName}
		      	        	className="rounded-pill"
		      	        	onChange={ e => setlastName(e.target.value) }
		      	        	required 
		      	        />
		      	      </Form.Group>

		      		  <Form.Group className="mt-3" controlId="userEmail">
		      		    <Form.Control 
		      		    	type="email" 
		      		    	placeholder="Enter email"
		      		    	value={email}
		      		    	className="rounded-pill"
		      		    	onChange={ e => setEmail(e.target.value) }
		      		    	required 
		      		    />
		      		    <Form.Text className="">
		      		      We'll never share your email with anyone else.
		      		    </Form.Text>
		      		  </Form.Group>

		      		  <Form.Group className="mt-4" controlId="mobile">
		      		    <Form.Control 
		      		    	type="tel" 
		      		    	placeholder="ex. 09012348765"
		      		    	pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
		      		    	value={mobile}
		      		    	className="rounded-pill"
		      		    	onChange={ e => setmobile(e.target.value) }
		      		    	required 
		      		    />
		      		  </Form.Group>

		      		  <Form.Group className="mt-4" controlId="password1">
		      		    
		      		    <Form.Control 
		      		    	type="password" 
		      		    	placeholder="Password"
		      		    	value={password1}
		      		    	className="rounded-pill"
		      		    	onChange={ e => setPassword1(e.target.value) }
		      		    	required 
		      		    />
		      		  </Form.Group>

		      		  <Form.Group className="mt-2" controlId="password2">
		      		    <Form.Control 
		      		    	type="password" 
		      		    	placeholder="Verify Password" 
		      		    	value={password2}
		      		    	className="rounded-pill"
		      		    	onChange={ e => setPassword2(e.target.value) }
		      		    	required />
		      		  </Form.Group>

		      		  	<Form.Group className="text-right ">
		      		  		{/*Conditionally render the submit button based on isActive state*/}

		      		  		  { isActive ? 
		      		  		  		<Button className="mt-4 rounded-pill" variant="warning" type="submit" id="submitBtn">
		      		  		  		  Register
		      		  		  		</Button>

		      		  		  		: 		

		      		  		  		<Button className="mt-4 rounded-pill" variant="secondary" type="submit" id="submitBtn" disabled>
		      		  		  		  Register
		      		  		  		</Button>

		      		  		  }
		      		  	</Form.Group>
			      </Form.Group>

			      
				</Form>
				:
				<Redirect to="/products" />
	)
}