import React, { Component } from 'react';

export default class TableProducts extends Component {
    loadProducts(){
        if(this.props.products){
            return this.props.products.map((pro, index) => {
                return (<RowProduct key={index} pd={pro} add={this.props.add}/>)
            })
        } 
    }

    render(){
        return(
            <table className="table table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">Cover</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Precio</th>
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

class RowProduct extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }
    isThereAnImage(){
        if(this.props.pd.avatarImage) return this.props.pd.avatarImage
        return "https://user-images.githubusercontent.com/16608864/35882949-bbe13aa0-0bab-11e8-859c-ceda3b213818.jpeg"
    }

    handleClick(e){
        this.props.add(e.currentTarget.getAttribute('data-id'));
    }

    render(){
        return(
            <tr>
                <td>
                    <img className="avatarImage" alt="" src={this.isThereAnImage()}/>
                </td>
                <td>{this.props.pd.title}</td>
                <td>{this.props.pd.price}</td>
                <td>
                    <button type="button" className="btn bg-warning edit" data-id={this.props.pd._id} onClick={this.handleClick}>
                        <span>Agregar</span>
                        <i className="material-icons float-right">add</i>
                    </button>
                </td>
            </tr>
        )
    }
}