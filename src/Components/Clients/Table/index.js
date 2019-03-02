import React, { Component } from 'react';

export default class TableClients extends Component {
    loadProducts(){
        let count = (this.props.page * this.props.items) - this.props.items;
        if(this.props.clients){
            return this.props.clients.map((cl, index) => {
                count++;
                return (<RowClient
                    key={index} 
                    cl={cl} 
                    number={count}
                    edit={this.props.edit}/>)
            })
        } 
    }

    render(){
        return(
            <table className="table table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cover</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {this.loadProducts()}
                </tbody>
            </table>
        )
    }
}

class RowClient extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(e){
        this.props.edit(e.currentTarget.getAttribute('data-id'));
    }

    isThereAnImage(){
        if(this.props.cl.photo) return this.props.cl.photo;
        return "https://res.cloudinary.com/dwapbqqbo/image/upload/v1551222505/pg2bkcnhmfldmi7g6qab.jpg";
    }

    render(){
        return(
            <tr>
                <th scope="row">{this.props.number}</th>
                <td>
                    <img className="avatarImage" alt="" src={this.isThereAnImage()}/>
                </td>
                <td>{this.props.cl.name}</td>
                <td>{this.props.cl.email}</td>
                <td>{this.props.cl.address}</td>
                <td>
                    <button type="button" className="btn bg-warning edit" data-id={this.props.cl._id} onClick={this.handleClick}>
                        <span>Editar</span>
                        <i className="material-icons float-right">edit</i>
                    </button>

                </td>
            </tr>
        )
    }
}