import React, { Component } from 'react';

// Components
import TableUsers from './Table';


export default class Users extends Component {
    showTable(){
        if(this.props.products.error){
            return (<h1>Error de conexion</h1>)
        }

        return <TableUsers 
            users={this.props.user.docs} 
            edit={this.editProduct} 
            page={this.props.products.page} 
            items={this.props.products.limit}
        />
    }

    render(){
        return(
            <div className="container">
                <div className="row mb-4">
                    <div className="col">
                        <h1>Administra Usuarios</h1>
                    </div>
                </div>
                <div className="row mb-5    ">
                    <div className="col-md-6">
                        <form className="form-inline my-2 my-lg-0 form-searh">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col-md-6 text-right">
                        <button type="button" className="btn btn-primary add" onClick={this.newProduct}>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}