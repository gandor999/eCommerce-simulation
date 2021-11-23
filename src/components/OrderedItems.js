import Fragment from 'react';
import { Col } from 'react-bootstrap';

export default function OrderedItems(prop){

	let { singleItem } = prop;

	return (
		<div className="p-2 ml-4">
			<div className="d-flex justify-content-center flex-column">
				<p className="ml-1 pr-2">
						Name: {singleItem.productName}		
					<p>Quanity: {singleItem.amount}</p>
				</p>	
			</div>
		</div>
	)
}