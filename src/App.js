import React              from 'react';
import logo               from './logo.svg';
import ReactDOM           from 'react-dom';
import './index.css';
import CategoryInterface  from './components/category/CategoryInterface';
import DisplayAllCategory from './components/category/DisplayAllCategory';
import BrandInterface     from './components/brands/BrandInterface';
import DisplayAllBrands   from './components/brands/DisplayAllBrands';
import OutletInterface    from './components/outlets/OutletInterface';
import DisplayAllOutlets  from './components/outlets/DisplayAllOutlets';
import ModelInterface     from './components/models/ModelInterface';
import DisplayAllModel    from './components/models/DisplayAllModel';
import ProductInterface   from './components/products/ProductInterface';
import DashboardO         from './components/outletLogin/DashboardO';
import Signin             from './components/admin/Signin';
import Dashboard          from './components/admin/Dashboard';
import SignIn             from './components/outletLogin/SignIn';
import ProductPicture     from './components/products/ProductPicture';
import MainPage           from './components/clientview/MainPage';
import FirstPage          from './components/clientview/Firstpage';
import ViewListofProducts from './components/clientview/ViewListofProducts';
import ProductView        from './components/clientview/Productview';
import './App.css';
import { BrowserRouter as Router,HashRouter, Route,NavLink,Redirect } from "react-router-dom";
import QtyCntrl from './components/clientview/QtyCntrl'
import ShoppingCartIcon from './components/clientview/ShoppingCartIcon'
import LogIn from './components/clientview/LogIn'
import ShowCart from './components/clientview/ShowCart'

function App(props) {
  return (
    <div>
       <Router> 
            <Route exact strict component={CategoryInterface} path={'/CategoryInterface'} history={props.history} />
            <Route exact strict component={DisplayAllCategory} path={'/DisplayAllCategory'} history={props.history} />
            <Route exact strict component={BrandInterface} path={'/BrandInterface'} history={props.history} />
            <Route exact strict component={DisplayAllBrands} path={'/DisplayAllBrands'} history={props.history} />
            <Route exact strict component={OutletInterface} path={'/OutletInterface'} history={props.history} />
            <Route exact strict component={DisplayAllOutlets} path={'/DisplayAllOutlets'} history={props.history} />
            <Route exact strict component={ModelInterface} path={'/ModelInterface'} history={props.history} />
            <Route exact strict component={DisplayAllModel} path={'/DisplayAllModel'} history={props.history} />
            <Route exact strict component={Signin} path={'/Signin'} history={props.history} />
            <Route exact strict component={Dashboard} path={'/Dashboard'} history={props.history} />
            <Route exact strict component={ProductInterface} path={'/ProductInterface'} history={props.history} />
            <Route exact strict component={DashboardO} path={'/DashboardO'} history={props.history} />
            <Route exact strict component={SignIn} path={'/OutletSignIn'} history={props.history}/>
            <Route exact strict component={ProductPicture} path={'/productpicture'} history={props.history}/>
            <Route exact strict component={MainPage} path={'/mainpage'} history={props.history}/>
            <Route exact strict component={FirstPage} path={'/FirstPage'} history={props.history}/>
            <Route exact strict component={ViewListofProducts} path={'/ViewListofProducts/:cid'} history={props.history}/>
            <Route exact strict component={ProductView} path={'/ProductView/:pid'} history={props.history}/>
            {/* <Route exact strict component={ShoppingCartIcon} path={'/ShoppingCartIcon'} history={props.history} />  */}
            <Route exact strict component={ShowCart} path={'/ShowCart'} history={props.history} /> 
            <Route exact strict component={LogIn} path={'/LogIn'} history={props.history} /> 

      </Router>  
    
    </div>
  );
}

export default App;
