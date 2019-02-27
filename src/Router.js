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

import Products from './Components/Products' 

class Router extends Component {
    isAuthenticate(){
        if(this.props.user.jwt){
            return (
                <ReactRouter history={this.props.history}>
                    <App>
                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route exact path="/productos" component={Products}></Route>
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