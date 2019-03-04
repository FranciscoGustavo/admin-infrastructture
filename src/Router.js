import React, { Component } from 'react';
import {
    Router as ReactRouter,
    Route,
    Switch
  } from 'react-router-dom';


// Redux
import { connect } from 'react-redux';

// Componetnts
import App from './App';
import Login from './Components/Login';
import Home from './Components/Home' ;

import Products from './Components/Products' ;
import Categories from './Components/Categories';
import Clients from './Components/Clients';
import Orders from './Components/Orders';
import NewOrders from './Components/Orders/NewOrder';
import EditOrder from './Components/Orders/EditOrder';
import Users from './Components/Users';

class Router extends Component {
    isAuthenticate(){
        if(this.props.user.jwt){
            return (
                <ReactRouter history={this.props.history}>
                    <App>
                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route exact path="/productos" component={Products}></Route>
                            <Route exact path="/categorias" component={Categories}></Route>
                            <Route exact path="/clientes" component={Clients}></Route>
                            <Route exact path="/pedidos" component={Orders}></Route>
                            <Route exact path="/pedidos/nuevo" component={NewOrders}></Route>
                            <Route exact path="/pedidos/edit/:id" component={EditOrder}></Route>
                            <Route exact path="/usuarios" component={Users}></Route>
                        </Switch>
                    </App>
                </ReactRouter>
            )
        } else {
            return(
                <Login/>
            )
        }
    }

    render(){
        return(
            this.isAuthenticate()
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        user : state.users
    }
}

export default connect(mapStateToProps)(Router)