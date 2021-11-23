import { useState, Fragment, useEffect, useContext } from 'react';
// Proptypes - used to validate props
import PropTypes from 'prop-types';
import { Button, Row, Col, Card, Modal, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imageSpace from './Space.jpg';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';



export default function ProductCard(prop){

	let tempArray = prop.tempArray;

	const { user, forceRender, setForceRender, setDetectChange, detectChange } = useContext(UserContext);



	const {_id, name, description, price, image } = prop.productProp;

	let temporder = {
		_id: _id,
		name: name,
		description: description,
		price: price,
		quantity: 0,
	}
	

	const [count, setCount] = useState(0);
	const [show, setShow] = useState(false);

	console.log(show)

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	function checkId(id, array){
		let isMatch = false;
		for(let i = 0; i < array.length; ++i){
			if(array[i]._id == id || array[i].id == id){
				isMatch = true;
				break;
			}
		}
		
		return isMatch;
	}


	function add(){
		// Find a way to pass productProp to Checkout function
		setCount(count + 1);
	}

	function subtract(){
		if(count > 0){
			setCount(count - 1);
		}

		else{
			Swal.fire({
				title: "Whoops",
				icon: "error",
				text: "Can't go down no more"
			})
		}
		
	}

	function addToCart(){
		if(count != 0){

			temporder.quantity = count;

			if(checkId(temporder._id, tempArray) == false){
				tempArray.push(temporder);
			}

			else{
				for(let i = 0; i < tempArray.length; ++i){
					if(tempArray[i]._id == temporder._id){
						tempArray[i].quantity += temporder.quantity
					}
				}
			}

			console.log(tempArray)
			localStorage.setItem('cart', JSON.stringify(tempArray))

			
			

			Swal.fire({
					title: "Alright",
					icon: "success",
					text: "Items added to the cart"
				})


			setDetectChange(true);
			setCount(0);
		}
		else{
			Swal.fire({
					title: "Umm...",
					icon: "question",
					text: "Pick something first please"
				})
		}

		
		handleClose();
		
		
	}

	useEffect(() => {
		prop.setTempArray(tempArray)
	})


	return (
			<Fragment>
				<Col xs={12} md={4} className="p-3 mb-4 filter-target">
					<Card className="cardHighlight border-dark">
					
					<Card.Img  className="image-fluid rounded" onClick={handleShow} variant="top" src={`${image}`} />
					
					  <Card.Body className="">
					    <Card.Title className="text-center title-card" onClick={handleShow}><h3>{name}</h3></Card.Title>
					    <Card.Text className="p-2">
					      <div className="pb-1">      	
					      	<strong>Description:</strong>
					      </div>

					      <div className="">      	
					      	{description}
					      </div>

					      <div className="pt-3 pb-1 d-flex">      	
					      	<strong>Price:</strong> <p className="pl-3">₱ {price}</p>
					      </div>

					     </Card.Text>
					      
					  </Card.Body>
					</Card>
				</Col>

				<Modal show={show} onHide={handleClose}>
				        <Modal.Header closeButton>
				          <Modal.Title>{name}</Modal.Title>
				        </Modal.Header>
				        <Modal.Body>
				        	<ul>
				        		<li><strong>Description:</strong></li>
				        		<li>{description}</li>
				        	</ul>

				        	<ul>
				        		<li><strong>Price:</strong> ₱ {price}</li>
				        		
				        	</ul>
				        </Modal.Body>
				        <Modal.Footer>
				          {
				          	(user.id !== null) ?
				          		(user.isAdmin) ?
				          		<Button disabled variant="outline-warning" onClick={addToCart}><Badge className="bg-danger" variant="danger">{count}</Badge>{' '}Admin not allowed!</Button>
				          			:
				          		<Button variant="outline-warning" onClick={addToCart}><Badge className="bg-danger" variant="danger">{count}</Badge>{' '}Add to Cart!</Button>
				          	:
				          		<Button as={Link} to="/login" variant="outline-warning"><Badge className="bg-danger" variant="danger">{count}</Badge>{' '}Login to Add to Cart!</Button>

				          }
				          
				          <Button variant="outline-danger" onClick={subtract}>Subtract</Button>
				          <Button variant="outline-primary" onClick={add}>Add</Button>
				          <Button variant="outline-secondary" onClick={handleClose}>
				            Close
				          </Button>
				        </Modal.Footer>
				      </Modal>
			</Fragment>
	)
}




// Checks the validity of the PropTypes
ProductCard.propTypes = {
	// "shape" method is used to check if a prop object conforms to a specific shape
	course: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}