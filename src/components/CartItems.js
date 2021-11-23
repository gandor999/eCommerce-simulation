import { Button } from 'react-bootstrap';
import { useState, Fragment, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function CartItems(prop){

	const { forceRender, setForceRender,  } = useContext(UserContext);

	let cartArray = prop.tempArray;

	console.log(cartArray)

	console.log(prop.tempArray)

	let objectRightNow = null;

	let index = null;

	for(let i = 0; i < prop.tempArray.length; ++i){
		if(cartArray[i]._id == prop.singledata._id){
			objectRightNow = prop.tempArray[i];
			index = i;
		}
	}

	const [quantity, setQuantity] = useState(prop.tempArray[index].quantity);

	useEffect(() => {

		setForceRender(forceRender + 1);
		setForceRender(forceRender - 1);

		prop.setTempArray(cartArray)
		localStorage.setItem('cart', JSON.stringify(cartArray))
	}, [quantity, cartArray])

	

	function add(){
		setQuantity(quantity + 1);
		cartArray[index].quantity = quantity + 1;

	}

	function subtract(){
		if(quantity > 1){
			setQuantity(quantity - 1);
			cartArray[index].quantity = quantity - 1;
		}

		else{
			cartArray.splice(index, 1);
			console.log(cartArray)
			localStorage.setItem('cart', JSON.stringify(cartArray))

			prop.setTempArray(tempArray => tempArray = cartArray);

			prop.handleClose();

			setTimeout(() => {
				prop.handleShow();
			}, 1)
		}
		
	}

	function remove(){

		cartArray.splice(index, 1);
		console.log(cartArray)
		localStorage.setItem('cart', JSON.stringify(cartArray))

		prop.setTempArray(tempArray => tempArray = cartArray);

		console.log(prop.tempArray);

		prop.handleClose();

		setTimeout(() => {
			prop.handleShow();
		}, 1)
	}


	


	return (

			<div className="d-flex">
				<div className="d-flex mr-auto text-right">
					<p className="">{objectRightNow.name}</p>
					
				</div>

				
				
				
				<div className="d-flex">
					<div className="mr-5 pr-3">
						{`₱ ${objectRightNow.price * quantity}`}
					</div>
					<div>
						<Button className="mr-2" onClick={subtract} variant="outline-warning" size="sm">-</Button>
							{`    ${quantity}    `}
						<Button className="ml-2 mr-2" onClick={add} variant="outline-success" size="sm">+</Button>
						<Button className="remover" className="ml-2" closeButton onClick={remove} variant="outline-danger" size="sm">X</Button>
					</div>
					
				</div>
				
			</div>
		)
	

	
}