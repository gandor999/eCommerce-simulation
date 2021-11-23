import { Button, Badge, Modal } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CartItems from './CartItems';
import UserContext from '../UserContext';
import React from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';



export default function Cart (prop){

	console.log(prop.tempArray); 

	let history = useHistory();


	const { user, forceRender, setForceRender, setDetectChange, detectChange } = useContext(UserContext);

	let tempArray = prop.tempArray

	let orderTicket = [];

	for(let i = 0; i < tempArray.length; ++i){
		orderTicket[i] = {
			amount: tempArray[i].quantity,
			productName: tempArray[i].name
		}
	}

	console.log(orderTicket);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	const [products, setProducts] = useState([]);
	const [isActive, setIsActive] = useState(false);



	let totalPrice = 0;

	for(let i = 0; i < tempArray.length; ++i){
		totalPrice += (tempArray[i].price * tempArray[i].quantity)
	}


	let productArray = [];

	for(let i = 0; i < tempArray.length; ++i){
		productArray.push(<CartItems
			
			 key={tempArray[i]._id} 
			 setTempArray={prop.setTempArray} 
			 tempArray={tempArray} 
			 singledata={tempArray[i]}
			 show={show}
			 setShow={setShow}
			 handleClose={handleClose}
			 handleShow={handleShow}
		 />)
	}

	console.log(user.token)


	function checkout(){
		

		fetch('https://tranquil-sierra-40350.herokuapp.com/users/checkout', {
			mode: 'no-cors',
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ user.token }`,
				'Content-Type': 'application/json'
				
			},
			body: JSON.stringify(orderTicket)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			Swal.fire({
				title: "Order Made!",
				icon: "success",
				text: "Thank You!"
			})

			setTimeout(() => {
				
				localStorage.setItem('cart', JSON.stringify([]));
				productArray = [];
				tempArray = [];
				prop.setTempArray(data => data = tempArray);
				console.log(tempArray)
				console.log(prop.tempArray);

				history.push(`/orders`)

				handleClose();


			}, 1)

		})


		
	}

	useEffect(() => {

		if(totalPrice !== 0){
			setIsActive(true);
		}

		else{
			setIsActive(false);
		}

		setForceRender(forceRender + 1);
		setForceRender(forceRender - 1);
		setDetectChange(false);
	}, [tempArray, detectChange, totalPrice])


	return (
		<div className="d-flex align-items-center">
			<Button className="rounded-pill" onClick={handleShow} variant="warning">Your Cart{' '}<Badge className="bg-danger ml-2" variant="danger">{prop.tempArray.length}</Badge></Button>
			<Modal show={show} onHide={handleClose}>
			  <Modal.Header closeButton>
			    <Modal.Title>Your Cart</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
			  	<div className="d-flex mb-4">
			  		<h5 className="mr-5">Name</h5>
			  		<h5 className="ml-auto mr-5">Price</h5>
			  		<h5 className="pr-5 ml-2">Quantity</h5>
			  	</div>
			    {productArray}
			  </Modal.Body>
			  {productArray = []}
			  <Modal.Footer>
			  	{
			  		(isActive) ?
			  			<Button className="mr-auto" variant="success" onClick={checkout}>Checkout</Button>
			  		:
			  			<Button className="mr-auto" variant="success" disabled>Checkout</Button>
			  	}
			    
			    <Button variant="warning">Total: {totalPrice}</Button>
			    <Button variant="secondary" onClick={handleClose}>Close</Button>
			    
			  </Modal.Footer>
			</Modal>
		</div>

	)
}