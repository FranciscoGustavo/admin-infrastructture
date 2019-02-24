import React, { Component } from 'react';
import {
    Router as ReactRouter,
    Route,
    Switch
  } from 'react-router-dom';


// Componetnts
import App from './App'
import Home from './Components/Home' 

import Products from './Components/Products' 

export default class Router extends Component {
    render(){
        return(
            <ReactRouter history={this.props.history}>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/productos" component={Products}></Route>
                    </Switch>
                </App>
            </ReactRouter>
        )
    }
}
