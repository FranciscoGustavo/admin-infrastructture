import React, { Component } from 'react';

export default class TableCategories extends Component {
    loadProducts(){
        let count = (this.props.page * this.props.items) - this.props.items;
        if(this.props.categories){
            return this.props.categories.map((cat, index) => {
                count++;
                return (<RowCategories 
                    key={index} 
                    ct={cat} 
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
                        <th scope="col">Titulo</th>
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

class RowCategories extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(e){
        this.props.edit(e.currentTarget.getAttribute('data-id'));
    }

    render(){
        return(
            <tr>
                <th scope="row">{this.props.number}</th>
                <td>{this.props.ct.title}</td>
                <td>
                    <button type="button" className="btn bg-warning edit" data-id={this.props.ct._id} onClick={this.handleClick}>
                        <span>Editar</span>
                        <i className="material-icons float-right">edit</i>
                    </button>

                </td>
            </tr>
        )
    }
}