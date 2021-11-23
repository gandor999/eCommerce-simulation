import { Fragment, useState, useContext, useEffect } from 'react';
import { Button, Card, Accordion, Row, Col, Modal, Form } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function ProductDatum(prop){

	let { datum } = prop;
	let content = [];
	const { forceRender, setForceRender, user, setUser } = useContext(UserContext);
	const [ isActive, setIsActive ] = useState(datum.isActive);
	const [ productName, setProductName ] = useState(datum.name);
	const [ productPrice, setProductPrice ] = useState(datum.price);
	const [ productDescription, setProductDescription ] = useState(datum.description);
	const [ productImage, setProductImage ] = useState(datum.image);
	const [ show, setShow ] = useState(false);
	const [ show2, setShow2 ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

	console.log(isActive);

	function updateIsActiveStatus(){
		setIsActive(!isActive);
		handleShow();
	}

	function notSure(){
		setIsActive(!isActive);
		handleClose();
	}

	function cancel(){
		setProductName(datum.name);
		setProductPrice(datum.price);
		setProductDescription(datum.description);
		handleClose2();
	}

	function sendUpdateStatus(){
		console.log(isActive);
		fetch(`https://tranquil-sierra-40350.herokuapp.com/products/${datum._id}/updateSatus`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ user.token }`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data){
				Swal.fire({
					title: "Update Success",
					icon: "success",
					text: "Congrats!"
				})
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

	function sendUpdateContent(e){
		e.preventDefault();

		fetch(`https://tranquil-sierra-40350.herokuapp.com/products/${datum._id}`, {
			method: 'PUT',
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
					heightAuto: false,
					title: "Update Success",
					icon: "success",
					text: "Congrats!"
				})
				setProductName(productName);
				setProductPrice(productPrice);
				setProductDescription(productDescription);
				setProductImage(productImage);

				handleClose2();
			}

			else{
				Swal.fire({
					heightAuto: false,
					title: "Something went wrong",
					icon: "error",
					text: "Please check codebase"
				})
				handleClose2();
			}
		})
	}

	return(
		<Col xs={12} sm={12} md={4} className="p-3 d-flex align-items-stretch justify-content-center">
			<Card className="w-100">
			  <Card.Header>
			  <div className="text-center">
			  	<h3>{productName}</h3>
			  </div>
			  </Card.Header>
			  <Card.Img onClick={handleShow2} className="image-fluid rounded" variant="top" src={`${productImage}`} />
			  <Card.Body className="">
			  	<div className="d-flex justify-content-center flex-column">

			  		<p className="text-center">
			  		  Description:
			  		  	<p>{productDescription}</p>
			  		</p>
			  		<p className="text-center">
			  		  Price: ₱ {productPrice}
			  		</p>
			  		<p className="text-center">
			  		  Status: {
			  		  	(isActive) ?
			  		  		`Available`
			  		  	:

			  		  		`Not Available`
			  		  }
			  		</p>
			  		
			  	</div>

			  	<div className="d-flex justify-content-around align-self-end">
			  		<Button onClick={handleShow2}  className="mr-3" variant="primary">
			  		  Update
			  		</Button>
			  		{
			  			(isActive) ?
			  				<Button onClick={updateIsActiveStatus} variant="danger">
			  				  Archive
			  				</Button>
			  			:
			  				<Button onClick={updateIsActiveStatus} variant="success">
			  				  Restore
			  				</Button>
			  		}
			  		
			  	</div>
			  </Card.Body>
			</Card>

			<Modal show={show} onHide={handleClose}>
		        <Modal.Header closeButton>
		          <Modal.Title>Change Status</Modal.Title>
		        </Modal.Header>
		        <Modal.Body className="text-center">Are you sure you want to change the status?</Modal.Body>
		        <Modal.Footer>
		          <Button variant="success" onClick={sendUpdateStatus}>
		            Yes
		          </Button>
		          <Button variant="warning" onClick={notSure}>
		            No
		          </Button>
		        </Modal.Footer>
			</Modal>

			<Modal show={show2} onHide={handleClose2}>
		        <Modal.Header closeButton>
		          <Modal.Title>Update Product</Modal.Title>
		        </Modal.Header>
		        <Modal.Body className="text-center">
		        	<Form>
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
		        	</Form>
		        	
		        </Modal.Body>
		        <Modal.Footer>
		          <Button onClick={sendUpdateContent} variant="success">
		            Confirm Update
		          </Button>
		          <Button onClick={cancel} variant="warning">
		            Cancel
		          </Button>
		        </Modal.Footer>
			</Modal>
		</Col>
		  
		
	)
}