import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

document.body.style.backgroundColor = '#F06543';

localStorage.setItem('cart', JSON.stringify([]));
localStorage.setItem('token', JSON.stringify())


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




/*const name = "John Smith";
const user = {
  firstName: 'Jane',
  lastName: 'Doe'
};

function formatName(user){
  return user.firstName + ' ' + user.lastName;
}

const element = <h1>Hello, {formatName(user)}</h1>

ReactDOM.render(
  element,
  document.getElementById('root')
);*/
