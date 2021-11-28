import { Fragment, useEffect, useState, useContext } from 'react';
import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard';
import { Button, Row, Col, Card, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import UserContext from '../UserContext';
import UserProvider from '../UserContext';


export default function Product(){

	const {
		user, 
		setUser, 
		forceRender, 
		setForceRender, 
		filterInput, 
		setFilterInput, 
		detectChange, 
		setDetectChange, 
		api, 
		peekingToken,
		products,
		setProducts 
	} = useContext(UserContext);	
	
	const [ tempArray, setTempArray ] = useState(JSON.parse(localStorage.getItem('cart')));
	const [ isLoading, setIsLoading ] = useState(false);

	// This token will be for viewing while not logged in purposes
	

	console.log(filterInput);

	useEffect(() => {

		setForceRender(forceRender + 1);
		setForceRender(forceRender - 1);
		setDetectChange(false);
	}, [tempArray, detectChange])


	useEffect(async () => {
		setIsLoading(true);

		await fetch(`${api}/products/all`, {
			
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
			
			setIsLoading(false);
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
				{
					(isLoading) ?
						<Spinner className="mt-5 m-5 align-self-center" animation="border" role="status">
						  <span className="sr-only">Loading...</span>
						</Spinner>
					:
						<div>
							
							<Row className="mt-3 mb-3 card-deck">
								{products}
							</Row>
						</div>
				}
				
				
			</Fragment>
		</Fragment>		
	)
}