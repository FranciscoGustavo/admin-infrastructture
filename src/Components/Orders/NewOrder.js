import React, { Component } from 'react';

// React Redux
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/clientsActions';
import * as search from '../../actions/searchActions';

// Components
import TableProducts from './Products/Table';
import InputField from '../Globals/Form/InputField';
import Search from '../Globals/Search';

class NewOrder extends Component {
    constructor(props){
        super(props)

        this.state = {
            iva : 16,
            total_price : 0,
            products : [],
            product : {
                _product : 230,
                title : 'Pepino Mediano',
                price : 20,
                quantity : 1
            }
        }
        
        this.props.dispatch(actions.getAllClients(false, this.props.user.jwt)); 
        
        this.search = this.search.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    optionsClients(){
        if(this.props.clients.docs){
            return this.props.clients.docs.map((e, index) =>{
                return (<option key={index} value={e._id}>{e.name}</option>)
            })
        }
    }

    removeProduct(id){
        let arr = []

        this.state.products.forEach((e, index) => {
            if(Number(index) !== Number(id)){
                
                arr.push(e)
            }
        });
        
        this.setState({products : arr});
        
    }

    addProduct(id){
        let product = this.props.products.filter(e => {return e._id === id})[0];

        let data = {
            _product : product._id,
            title: product.title,
            price : product.price,
            quantity : 1
        }
        let products = this.state.products;

        products.push(data);

        this.setState({products});        
    }

    showProductsInList(){
        return this.state.products.map( (e, index) => {
            return (<ProductRow key={index} pd={e} i={index} remove={this.removeProduct}/>)
        })
    }

    search(text){
        if(text !== "") this.props.dispatch(search.findProducts(text))
    }

    render(){
        return (
            <div className="row">
                <div className="col-12">
                    
                    <h2 className="">Crear Pedido</h2>
                </div>
                <div className="col-12 col-md-7">
                    <form className="p-3 border border-primary">
                        <fieldset disabled>
                            <div className="row">
                                <InputField label="Usuario" value={this.props.user.user.name} responsive="col-6"/>
                                <InputField label="Id" value={this.props.user.user.id} responsive="col-6"/>
                            </div>
                        </fieldset>
                        <div className="row">

                            <div className="form-group col-md-5">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="material-icons">account_circle</i>
                                        </div>
                                    </div>
                                    <select className="custom-select" ref={this.categoryRef}>
                                        <option value="">Seleccionar Cliente</option>
                                        {this.optionsClients()}
                                    </select>
                                </div>
                                
                            </div>

                            <div className="form-group col-md-2">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">%</div>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.state.iva}/>
                                </div>
                            </div>

                            <div className="form-group col-md-3">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">$</div>
                                    </div>
                                    <input type="text" className="form-control" defaultValue={this.state.total_price} />
                                </div>
                            </div>

                            <div className="form-group col-md-2">
                                <button type="submit" className="btn btn-primary w-100">Guardar</button>
                            </div>

                        </div>
                        <div className="row">
                            {this.showProductsInList()}
                        </div>
                    </form>
                </div>
                <div className="col-12 col-md-5">
                    <div className="row border border-primary">
                        <div className="col-12 mb-3">
                            <Search search={this.search}/>
                        </div>
                        <div className="col-12">
                            <TableProducts products={this.props.products} add={this.addProduct}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return { user : state.users, clients : state.clients, products : state.search  }
}

export default connect(mapStateToProps)(NewOrder);

class ProductRow extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            price : this.props.pd.price
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.remove(e.currentTarget.getAttribute('data-id'));
    }

    render(){
        return(
            <div className="col-12 p-0">
                <div className="row shadow m-3 p-3 align-items-center">
                    <div className="col-2">
                        <button type="button" className="btn text-white p-0" data-id={this.props.i} onClick={this.handleClick}>
                            <i className="material-icons bg-danger rounded-sm">close</i>
                        </button>
                    </div>
                    <div className="col-4 col-md-6">
                        <h6 className="md-h4">{this.props.pd.title}</h6>
                    </div>
                    <div className="col-3 col-md-2">
                        <div className="form-group mb-0">
                            <input type="number" className="form-control" 
                                id="price" 
                                defaultValue={this.props.pd.quantity}
                            />
                        </div>
                    </div>
                    <div className="col-3 col-md-2">
                        <fieldset disabled>
                            <div className="form-group mb-0">
                                <input type="number" className="form-control b-0" 
                                    id="price" 
                                    defaultValue={this.state.price}
                                />
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }
}