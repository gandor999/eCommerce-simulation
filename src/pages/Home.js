import { Fragment, useContext } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Home(){

	const { user } = useContext(UserContext);

	return (
		<Fragment>
			<div className="p-4 banner text-center">

				<div>
					<div id="hello" className="text-center p-3 mb-5 mt-5 rounded-pill">
						<h1>Hello!</h1>
					</div>
				</div>

				<div id="para" className="p-3 text-center rounded-pill">
					<p className="p-3">
					  Welcome to Geodor's react eCommerce webstore where you'll find features such as browsing products, adding
					  products into a cart, checking out with those products, and viewing the history of your orders.
					</p>
					{/*<p className="pb-2"> 
					  As well as admin features for special accounts.
					</p>*/}
					
				</div>

				{
					(user.id !== null) ?
						
						(user.isAdmin) ? 
							<div></div>
						:
							<div id="register-and-login" className="pl-5 d-flex flex-md-row flex-column">

								<div id="para4" className="mr-md-auto text-center rounded-pill mt-5">
									<p className="pt-2">
										<Link className="text-dark" to="/products"><h4>Products!</h4></Link>
									</p>
								</div>						
							</div>
					:
						
						
						<div id="register-and-login" className="pl-5 d-flex flex-md-row flex-column">

							<div id="para4" className="mr-md-auto text-center rounded-pill mt-5">
								<p className="pt-2">
									<Link className="text-dark" to="/products"><h4>Products!</h4></Link>
								</p>
							</div>

							<div id="para3" className="ml-md-auto text-center rounded-pill mt-5">
								<p className="pt-2">
									<Link className="text-dark" to="/login"><h4>Login</h4></Link>
								</p>
							</div>

							<div id="para2" className="ml-md-5 text-center rounded-pill mt-5">
								<p className="pt-2"> 
								  <Link className="text-dark" to="/register"><h4>Register</h4></Link>
								</p>
							</div>
						</div>
						
				}
			</div> 
		</Fragment>
	)
}