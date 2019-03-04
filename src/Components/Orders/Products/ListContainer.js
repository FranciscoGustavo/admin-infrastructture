import React, { Component } from 'react';

// Components
import Product from './AddProductList';

export default class List extends Component {
    showProduts(){
        if(!this.props.products){
            return <h1>Cargando</h1>
        }else if(this.props.products.length > 0){
            return this.props.products.map((e,index) => {
                if(e !== false){
                    return (
                        <Product 
                            key={index} 
                            pd={e} 
                            id={index} 
                            delete={this.props.delete}
                            update={this.props.update}
                        />
                    )
                }else {
                    return false
                }
            })
        } else {
            return <h1>Agrega Nuevos Productos</h1>
        } 
    }
    
    render(){
        return (
            <div className="row">
                {this.showProduts()}
            </div>
        )
    }
}