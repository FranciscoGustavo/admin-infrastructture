import React, { Component } from 'react';

export default class TableProducts extends Component {
    loadProducts(){
        if(this.props.products){
            return this.props.products.map((pro, index) => {
                return (<RowProduct key={index} pd={pro} edit={this.props.edit}/>)
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
                        <th scope="col">Titulo</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Unidad</th>
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

    isThereACategory(){
        if(this.props.pd._category) return this.props.pd._category.title
        return "Undifined"
    }

    handleClick(e){
        console.log(e.currentTarget.getAttribute('data-id'))
        //if(e.currentTarget.tagName !== 'BUTTON') e.target = e.target.parentElement
        console.log(e.currentTarget)
        this.props.edit(e.currentTarget.getAttribute('data-id'));
    }

    render(){
        return(
            <tr>
                <th scope="row">2</th>
                <td>
                    <img className="avatarImage" alt="" src={this.isThereAnImage()}/>
                </td>
                <td>{this.props.pd.title}</td>
                <td>{this.props.pd.description}</td>
                <td>{this.isThereACategory()}</td>
                <td>{this.props.pd.price}</td>
                <td>{this.props.pd.unity}</td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" data-id={this.props.pd._id} onClick={this.handleClick}>
                            <i className="material-icons">edit</i>
                        </button>
                        <button type="button" className="btn btn-secondary">
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}