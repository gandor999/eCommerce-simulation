import { Fragment, useEffect, useState, useContext } from 'react';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import UserContext from '../UserContext';
import OrderTicket from '../components/OrderTicket';
import Filter from '../components/Filter';



export default function OrderHistory(prop){

	const {user, setUser, filterInput, setFilterInput} = useContext(UserContext);
	const [ orderTickets, setOrderTickets ]  = useState([]);

	let endpoint = 'myOrders';

	if(prop.end !== undefined){
		endpoint = prop.end;
	}


	useEffect(() => {
		fetch(`http://localhost:4000/users/${endpoint}`, {
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
			
			
		})
	}, [filterInput]) 

	return (
		<Fragment>

			{
				(endpoint == 'myOrders') ?
					<Fragment>
						<div id="order-header">
							<div id="order-header-content" className="mt-5 text-center rounded-pill p-3">
								<h1 id="order-header-text">Order History</h1>
							</div>
						</div>
						<div>
							<Filter />
						</div>
						<Row className="">
							{orderTickets}
						</Row>
					</Fragment>
				:
					<Fragment>
						<div>
							<Filter />
						</div>
						<Row className="">
							{orderTickets}
						</Row>
					</Fragment>
			}	
			
		</Fragment>	
	)
} 