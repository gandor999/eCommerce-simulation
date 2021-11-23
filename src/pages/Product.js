import { Fragment, useEffect, useState, useContext } from 'react';
import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import UserContext from '../UserContext';
import UserProvider from '../UserContext';


export default function Product(){

	const {user, setUser, forceRender, setForceRender, filterInput, setFilterInput, detectChange, setDetectChange } = useContext(UserContext);	
	const [ products, setProducts ] = useState([]);
	const [ tempArray, setTempArray ] = useState(JSON.parse(localStorage.getItem('cart')))

	// This token will be for viewing while not logged in purposes
	let peekingToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc0NDUzMDM2NzRlMDEwMWVkODlhMCIsImVtYWlsIjoiZ2dAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjM3NTY2MzU2fQ.cvC7QR0w46OBVukd1Eo-iX2UKcN2Ea1-nv5xcRTtbdg"

	console.log(filterInput);

	useEffect(() => {

		setForceRender(forceRender + 1);
		setForceRender(forceRender - 1);
		setDetectChange(false);
	}, [tempArray, detectChange])


	useEffect(() => {
		fetch('https://tranquil-sierra-40350.herokuapp.com/products/all', {
			headers: {
				Authorization: `Bearer ${ peekingToken }`
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
											
							<ProductCard key={product._id} tempArray={tempArray} setTempArray={setTempArray} productProp = {product} />
							
						)
					})
				);
			
		})
	}, [filterInput])


	return (
		<Fragment>
	
			<Fragment>
				<div className="text-md-left text-center d-flex flex-column flex-md-row">
						<div className="mt-5 product-header p-3 px-5 rounded-pill">
							<h1>Products</h1>
						</div>

					<div className="ml-auto align-self-end mt-4">
						<div className="pr-5 pb-3 cart">
							<Cart setTempArray={setTempArray} tempArray={tempArray} />
						</div>
					</div>
				</div>
				
				<Filter />
				<Row className="mt-3 mb-3 card-deck">
					{products}
				</Row>	
			</Fragment>
		</Fragment>		
	)
}