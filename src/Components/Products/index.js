import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/productsActions';

// Components
import TableProducts from './Table';

class Products extends Component {
    constructor(props){
        super(props)

        this.props.dispatch(actions.getAllProducts());
        this.editProduct = this.editProduct.bind(this)
    }

    editProduct(id){
        const product = this.props.products.docs.filter(e => {return e._id === id})[0]
        console.log(product)
        this.openModal()
    }

    openModal(){

    }

    render(){
        return(
            <div className="container products">
                <div className="row mb-4">
                    <div className="col">
                        <h1>Administra Productos</h1>
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
                        <button type="button" className="btn btn-primary add">
                            Agregar
                        </button>
                    </div>
                </div>
                <TableProducts products={this.props.products.docs} edit={this.editProduct}/>
            

            </div>
        )
    }
}

function maspStateToProps(state, ownProps){
    return { products: state.products}
}

export default connect(maspStateToProps)(Products)