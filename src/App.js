// import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar'
import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import Product from './pages/Product';
import Admin from './pages/Admin';
import Home from './pages/Home';
import OrderHistory from './pages/OrderHistory';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Logout from './pages/Logout';
import { UserProvider } from './UserContext';



function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    token: localStorage.getItem('token')
  })

  const [ products, setProducts ] = useState([]);
  const [forceRender, setForceRender] = useState(0);
  const [detectChange, setDetectChange] = useState(false);
  const [ filterInput, setFilterInput ] = useState('');
  const [ api, setApi ] = useState('https://tranquil-sierra-40350.herokuapp.com');
  const [ peekingToken, setPeekingToken ] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc0NDUzMDM2NzRlMDEwMWVkODlhMCIsImVtYWlsIjoiZ2dAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjM3NTY2MzU2fQ.cvC7QR0w46OBVukd1Eo-iX2UKcN2Ea1-nv5xcRTtbdg'); 

  console.log(detectChange)

  const unsetUser = () => {
    localStorage.setItem('token', JSON.stringify())
    user.id = null;
    user.isAdmin = null
  }

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user])



  useEffect(() => {
    fetch(`${api}/products/all`, {
      
      headers: {
        Authorization: `Bearer ${ peekingToken }`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
    })
  }, [filterInput]) 


  return (

    <UserProvider value={{
      user, 
      setUser, 
      unsetUser, 
      forceRender, 
      setForceRender, 
      detectChange, 
      setDetectChange, 
      filterInput, 
      setFilterInput,
      api,
      setApi,
      peekingToken,
      products,
      setProducts
    }}>
      <Router>
        <AppNavbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/orders" component={OrderHistory} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/products" component={Product} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/logout" component={Logout} />
            <Route component={ErrorPage} />
          </Switch>
        </Container>
      </Router>
    </UserProvider>
      
  );
}

export default App;
