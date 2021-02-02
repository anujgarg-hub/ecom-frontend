import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import CategoryInterface from './components/category/CategoryInterface';
// import BrandInterface from './components/brands/BrandInterface';
// import OutletInterface from './components/outlets/OutletInterface';
// // import DisplayAllFormat from './components/brands/DisplayAllFormat';

import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import RootReducer from './components/rootreducer/RootReducer'

const store=createStore(RootReducer)

// import Displayall from './components/category/Displayall';
// // import DisplayAllFormat from './components/outlets/DisplayAllFormat';
// import Signin from './components/admin/Signin'


ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}><App /></Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
