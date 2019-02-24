import React, { Component } from 'react';

export default class Navbar extends Component {
    render(){
        return(
            <nav className="navbar">
                <button onClick={this.props.handleClick} className="btn-menu">
                    <i className="material-icons">menu</i>
                </button>                
            </nav>
        )
    }
}