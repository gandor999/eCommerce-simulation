import { Fragment, useContext } from 'react';
// Import necessary compnents from react-boostrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import UserContext from '../UserContext';


// AppNavbar component
export default function AppNavbar(){
	// State to store the user information stored in the login page

	// const [user, setUser] = useState(localStorage.getItem("email"));
	// console.log(user);

	const { user } = useContext(UserContext);


	return (

		<Fragment>
			<Dropdown className="d-md-none mb-5 p-2 text-center">
			  <Dropdown.Toggle variant="Danger" id="dropdown-basic">
			    <h1></h1>
			  </Dropdown.Toggle>

			  <Dropdown.Menu className="text-center" align="">
			  	<Dropdown.Item as={Link} to="/">Home</Dropdown.Item>

			  	      {
			  	      	(user.isAdmin) ?
			  	      	<Fragment>
			  	      		{(user.id !== null) ?
			  	      			<Fragment>
			  	      				<Dropdown.Item as={Link} to="/admin">Admin</Dropdown.Item>
			  	      				<Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
			  	      			</Fragment>		    	
			  	      			:
			  	      			<Fragment>
			  	      				<Dropdown.Item as={NavLink} to="/products" exact>Products</Dropdown.Item>
			  	      				<Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
			  	      				<Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
			  	      			</Fragment>
			  	      		}
			  	      	</Fragment>
			  	      	:
			  	      	<Fragment>
			  	      		{(user.id !== null) ?
			  	      			<Fragment>
			  	      				<Dropdown.Item as={Link} to="/orders">Orders</Dropdown.Item>
			  	      				<Dropdown.Item as={Link} to="/products">Products</Dropdown.Item>
			  	      				<Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
			  	      			</Fragment>		    	
			  	      			:
			  	      			<Fragment>
			  	      				<Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
			  	      				<Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
			  	      			</Fragment>
			  	      		}
			  	      	</Fragment>
			  	      } 
			  </Dropdown.Menu>
			</Dropdown>

			<Navbar className="d-none d-md-block" bg="dark" variant="dark" >

			    <Navbar.Toggle aria-controls="basic-navbar-nav" />
			    <Navbar.Collapse id="basic-navbar-nav">
			    <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
				    <Nav className="ml-auto">

				      {
				      	(user.isAdmin) ?
				      	<Fragment>
				      		{console.log(user.token)}
				      		{(user.id !== null) ?
				      			<Fragment>
					      			<Nav.Link as={NavLink} to="/admin" exact>Admin</Nav.Link>
				      				<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
				      			</Fragment>
				      			
				      			:
				      			<Fragment>
				      				<Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
				      				<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
				      				<Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
				      			</Fragment>
				      		}
				      	</Fragment>
				      	:
				      	<Fragment>
				      		{(user.id !== null) ?
				      			<Fragment>
				      				<Nav.Link as={NavLink} to="/orders" exact>Orders</Nav.Link>
					      			<Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
				      				<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
				      			</Fragment>
				      			:
				      			<Fragment>
				      				<Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
				      				<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
				      				<Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
				      			</Fragment>
				      		}
				      	</Fragment>
				      }
				      
				      
				    </Nav>
			    </Navbar.Collapse>
			</Navbar>
		</Fragment>

		
	)
}


/*
- The "as" prop allows components to be treated as if they are a different component gaining access to it's properties and functionalities.
- The "to" prop is used in place of the "href" prop for providing the URL for the page.
- The "exact" prop is used to highlight the active NavLink component that matches the URL.
*/
