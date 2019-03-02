import  React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class TableOrders extends Component {

    loadOrders(){
        let count = (this.props.page * this.props.items) - this.props.items;        
        if(this.props.orders){
            return this.props.orders.map((e,index)=>{
                count++;
                return <RowOrders key={index} od={e} number={count} edit={this.props.edit}/>
            })
        }
    }

    render(){
        return(
            <table className="table table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Dorección</th>
                        <th scope="col">Productos</th>
                        <th scope="col">Total</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {this.loadOrders()}
                </tbody>
            </table>
        )
    }
}

class RowOrders extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        this.props.edit(e.currentTarget.getAttribute('data-id'));
    }

    render(){
        return (
            <tr>
                <th scope="row">{this.props.number}</th>
                <td>{this.props.od.name}</td>
                <td>{this.props.od.address}</td>
                <td>{this.props.od.total_items}</td>
                <td>{'$ ' + this.props.od.total_price}</td>
                <td>
                    <Link to={"/pedidos/edit/"+this.props.od._id} className="btn bg-warning edit" data-id={this.props.od._id} onClick={this.handleClick}>
                        <span>Editar</span>
                        <i className="material-icons float-right">edit</i>
                    </Link>
                </td>
            </tr>
        )
    }
}