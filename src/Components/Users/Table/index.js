import React, { Component } from 'react';

export default class TableUsers extends Component {
    loadProducts(){
        let count = (this.props.page * this.props.items) - this.props.items;
        if(this.props.users){
            return this.props.users.map((pro, index) => {
                count++;
                return (<RowProduct key={index} us={pro} edit={this.props.edit} number={count}/>)
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
                        <th scope="col">Email</th>
                        <th scope="col">Permisos</th>
                    </tr>
                </thead>
                <tbody>
                    {this.loadProducts()}
                </tbody>
            </table>
        )
    }
}

class RowProduct extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    isThereAnImage(){
        if(this.props.us.photo) return this.props.us.photo
        return "https://user-images.githubusercontent.com/16608864/35882949-bbe13aa0-0bab-11e8-859c-ceda3b213818.jpeg"
    }

    permisions(){
        if(this.props.us.admin) return "Administrador"
        return "Editor"
    }

    handleClick(e){
        this.props.edit(e.currentTarget.getAttribute('data-id'));
    }

    render(){
        return(
            <tr>
                <th scope="row">{this.props.number}</th>
                <td>
                    <img className="avatarImage" alt="" src={this.isThereAnImage()}/>
                </td>
                <td>{this.props.us.name}</td>
                <td>{this.props.us.email}</td>
                <td>{this.permisions()}</td>
                <td>
                    <button type="button" className="btn bg-warning edit" data-id={this.props.us._id} onClick={this.handleClick}>
                        <span>Editar</span>
                        <i className="material-icons float-right">edit</i>
                    </button>
                </td>
            </tr>
        )
    }
}