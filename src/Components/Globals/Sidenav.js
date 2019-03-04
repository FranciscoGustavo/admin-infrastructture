import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Sidenav extends Component {
    render(){
        return(
            <ul className={"sidenav navbar-nav shadow  " + this.props.isActive}>
                <li className="nav-item brand">
                    <span className="navbar-brand">Infrastructure</span>          
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <i className="material-icons">home</i>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/productos" className="nav-link">
                        <i className="material-icons">library_books</i>
                        Productos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/categorias" className="nav-link">
                        <i className="material-icons">find_in_page</i>
                        Categorias
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/clientes" className="nav-link">
                        <i className="material-icons">group</i>
                        Clientes
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/pedidos" className="nav-link">
                        <i className="material-icons">shopping_cart</i>
                        Pedidos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/usuarios" className="nav-link">
                        <i className="material-icons">supervised_user_circle</i>
                        Usuarios
                    </Link>
                </li>
            </ul>
        )
    }
}