import { Fragment } from 'react';
import { Button, Card, Accordion, Row, Col } from 'react-bootstrap';
import OrderedItems from './OrderedItems';

export default function OrderTicket(prop){

	let { items } = prop;

	let { orders } = prop;

	let content = [];

	console.log(items.length)

	for(let i = 0; i < items.length; ++i){
		content.push(<OrderedItems
			key={items[i]._id}
			singleItem={items[i]}
		/>)
	}

	return(
		<Col xs={12} sm={12} md={4} className="p-3 d-flex align-items-stretch">
			<Card>
			  <Card.Header>
			  <div className="p-2">
			  	Order No: {orders._id}
			  	<p>
			  		UserId: {orders.userId}
			  		<p>{orders.purchasedOn}</p>
			  	</p>

			  </div>
			  </Card.Header>
			  <Card.Body className="d-flex flex-column">
			  	<div className="d-flex justify-content-center">
			  		{/*<p className="ml-3 mr-5">
			  		  Quanity
			  		</p>
			  		<p className="mr-5">
			  		  Name
			  		</p>*/}
			  	</div>
			    <p>
			      <div>
			        {content}
			      </div>
			    </p>
			    <div className="align-self-center">
			    	<footer className="blockquote-footer">
			    	  <cite className="" title="Source Title">Total : ₱ {orders.totalPrice}</cite>
			    	</footer>
			    </div>
			  </Card.Body>
			</Card>
		</Col>
		  
		
	)
}