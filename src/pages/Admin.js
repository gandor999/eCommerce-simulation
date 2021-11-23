import { useState, useEffect, useContext } from 'react';
import { Form, Button, ListGroup, Dropdown, Modal, Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import ProductDatum from '../components/ProductDatum';
import OrderHistory from './OrderHistory';
import Filter from '../components/Filter';
import OrderTicket from '../components/OrderTicket';
import Swal from 'sweetalert2';

// placholders only

export default function Admin(){

	
	const { forceRender, setForceRender, user, setUser, detectChange, setDetectChange, filterInput, setFilterInput } = useContext(UserContext);
	const [ route, setRoute ] = useState('');
	const [ products, setProducts ] = useState([]);
	const [ productName, setProductName ] = useState('');
	const [ productPrice, setProductPrice ] = useState('');
	const [ productDescription, setProductDescription ] = useState('');
	const [ productImage, setProductImage ] = useState('');
	const [ orderTickets, setOrderTickets ]  = useState([]);
	const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	console.log(route);
	console.log(productName);
	console.log(productPrice);
	console.log(productDescription);
	console.log(filterInput)

	useEffect(() => {
		fetch('https://tranquil-sierra-40350.herokuapp.com/products/allBoth', {
			headers: {
				Authorization: `Bearer ${ user.token }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			
				setProducts(

					data
					.filter(datum => {
						return datum.name.toUpperCase().indexOf(filterInput.toUpperCase()) >= 0;
					})
					.map(product => {
						return (		
							<ProductDatum key={product._id} datum = {product} />
						)
					})
				);
				
				setDetectChange(false);
			
		})

		let endpoint = 'orders';

		fetch(`https://tranquil-sierra-40350.herokuapp.com/users/${endpoint}`, {
			headers: {
				Authorization: `Bearer ${ user.token }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			data.reverse();
				setOrderTickets(

					data
					.filter(datum => {
						let isMatch = false;

						for(let i = 0; i < datum.items.length; ++i){
							if(datum.items[i].productName.toUpperCase().indexOf(filterInput.toUpperCase()) >= 0){
								isMatch = true;
								break;
							}
						}

						return (
							datum._id.toUpperCase().indexOf(filterInput.toUpperCase()) >= 0 ||
							isMatch == true ||
							datum.userId.toUpperCase().indexOf(filterInput.toUpperCase()) >= 0
						);
					})

					.map(order => {
						return (
							<OrderTicket key={order._id} orders={order} items={order.items} />
						)
					})
				);

				setDetectChange(false);
		})

		
		
	}, [filterInput, detectChange])



	function createProduct(){
		fetch(`https://tranquil-sierra-40350.herokuapp.com/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ user.token }`
			},
			body: JSON.stringify({
				name: productName,
				price: productPrice,
				description: productDescription,
				image: productImage
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data){
				Swal.fire({
					title: "New Product Added!",
					icon: "success",
					text: "Nice!"
				})
				
				setDetectChange(true);
				
				setProductName('');
				setProductPrice('');
				setProductDescription('');
				setProductImage('');

				handleClose();
			}

			else{
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please check codebase"
				})
				handleClose();
			}
		})
	}


	function viewAllOrders(e){
		e.preventDefault();
		setRoute('orders'); 
		setDetectChange(true);
	}

	return (
		
			<Form className="mt-3 pt-5 mt-5">
		      
			  <Form.Group>
			  	<div id="admin-header">
			  		<div id="admin-header-content" className="mt-3 text-center rounded-pill p-3">
			  			<h1 id="admin-header-text">Admin Dashboard</h1>
			  		</div>
			  	</div>
			  </Form.Group>

			  <Form.Group className="mt-5 pt-5 pb-3 d-md-flex justify-content-around border-bottom border-dark">


			  	<Dropdown className="d-md-none mb-5 p-5 text-center">
			  	  <Dropdown.Toggle variant="Danger" id="dropdown-basic">
			  	    <h1>Products</h1>
			  	  </Dropdown.Toggle>

			  	  <Dropdown.Menu className="text-center">
			  	    <Dropdown.Item onClick={() => {setRoute('viewAll')}}>View all products</Dropdown.Item>
			  	    <Dropdown.Item onClick={handleShow}>Create a Product</Dropdown.Item>
			  	  </Dropdown.Menu>
			  	</Dropdown>


			  	<Dropdown className="d-md-none mb-5 p-5 text-center">
			  	  <Dropdown.Toggle variant="Danger" id="dropdown-basic">
			  	    <h1>Users</h1>
			  	  </Dropdown.Toggle>

			  	  <Dropdown.Menu className="text-center">
			  	    <Dropdown.Item href="#/action-1">View all users</Dropdown.Item>
			  	  </Dropdown.Menu>
			  	</Dropdown>

			  	<Dropdown className="d-md-none mb-5 p-5 text-center">
			  	  <Dropdown.Toggle variant="Danger" id="dropdown-basic">
			  	    <h1>Orders</h1>
			  	  </Dropdown.Toggle>

			  	  <Dropdown.Menu className="text-center">
			  	    <Dropdown.Item href="#/action-1">View all orders</Dropdown.Item>
			  	  </Dropdown.Menu>
			  	</Dropdown>

			  	<ListGroup defaultActiveKey="#link1" className="d-none d-md-block">
			  		<Form.Text className="text-center mb-4">
			  			<h1>Products</h1>
			  		</Form.Text>
			  	    <ListGroup.Item onClick={() => {setRoute('viewAll')}} className="rounded mb-3" action href="#link1">
			  	      View all products
			  	    </ListGroup.Item>
			  	    <ListGroup.Item onClick={handleShow} className="rounded mb-3" action href="#link3">
			  	      Create a Product
			  	    </ListGroup.Item>
			  	</ListGroup>

			  	
			  	<ListGroup defaultActiveKey="#link2" className="d-none d-md-block">
			  		<Form.Text className="text-center mb-4">
			  			<h1>Users</h1>
			  		</Form.Text>
			  	    <ListGroup.Item onClick={() => {alert(`Feature to be contructed after satisfied CSS`);}} className="rounded mb-3" action href="#link5">
			  	      View all users
			  	    </ListGroup.Item>
			  	</ListGroup>

			  	<ListGroup defaultActiveKey="#link3" className="d-none d-md-block">
			  		<Form.Text className="text-center mb-4">
			  			<h1>Orders</h1>
			  		</Form.Text>
			  	    <ListGroup.Item onClick={viewAllOrders} className="rounded mb-3" action href="#link8">
			  	      View all orders
			  	    </ListGroup.Item>    
			  	</ListGroup>
			  </Form.Group>

			  {

			  	(route === 'viewAll') ?
			  		<Form.Group className="mt-5">
			  			<Filter />
			  			<Row className="d-flex justify-content-center">
			  				{products}
			  			</Row>
			  		</Form.Group>
			  	:
			  		(route === 'orders') ?
			  			<Form.Group>
			  				<Filter />
			  				<Row>
			  					{orderTickets}
			  				</Row>
			  			</Form.Group>
			  			
			  		:
						<Form.Group>

						</Form.Group>
			  }

			   <Form.Group>
			   	<Modal show={show} onHide={handleClose}>
		   	        <Modal.Header closeButton>
		   	          <Modal.Title>Create a product</Modal.Title>
		   	        </Modal.Header>

		   	        <Modal.Body>
		   	        	<Form.Group>
		   	        		<Form.Group className="mb-4 p-2" controlId="productName">
		   	        		  <Form.Control 
		   	        		  	type="text" 
		   	        		  	placeholder="Enter Product Name"
		   	        		  	value={productName}
		   	        		  	onChange={ e => setProductName(e.target.value) }
		   	        		  	required 
		   	        		  />
		   	        		</Form.Group>

		   	        		<Form.Group className="mb-4 p-2" controlId="productPrice">
		   	        		  <Form.Control 
		   	        		  	type="number" 
		   	        		  	placeholder="Enter Product Price"
		   	        		  	value={productPrice}
		   	        		  	onChange={ e => setProductPrice(e.target.value) }
		   	        		  	required 
		   	        		  />
		   	        		</Form.Group>

		   	        		<Form.Group className="mb-4 p-2" controlId="productImage">
		   	        		  <Form.Control 
		   	        		  	type="text" 
		   	        		  	placeholder="Enter Product Image URL"
		   	        		  	value={productImage}
		   	        		  	onChange={ e => setProductImage(e.target.value) }
		   	        		  	required 
		   	        		  />
		   	        		</Form.Group>

		   	        		<Form.Group className="mb-4 p-2" controlId="productDescription">
		   	        		  <Form.Control
		   	        		  	as="textarea" rows={4}
		   	        		  	type="text" 
		   	        		  	placeholder="Enter Product Description"
		   	        		  	value={productDescription}
		   	        		  	onChange={ e => setProductDescription(e.target.value) }
		   	        		  	required 
		   	        		  />
		   	        		</Form.Group>
		   	        	</Form.Group>
		   	        </Modal.Body>

		   	        <Modal.Footer>
		   	          <Button variant="secondary" onClick={handleClose}>
		   	            Close
		   	          </Button>
		   	          <Button variant="warning" onClick={createProduct}>
		   	            Create
		   	          </Button>
		   	        </Modal.Footer>
			   	</Modal>
			   </Form.Group>
			</Form>
	)
}