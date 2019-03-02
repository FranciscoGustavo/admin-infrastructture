import React, { Component } from 'react';

// Components 
import InputField from '../Globals/Form/InputField';
import TableProducts from './Products/Table';

export default class Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            products : this.props.order.products || []
        }

        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }
    addProduct(id){
        console.log(id);
        let product = this.props.products.docs.filter(e => { return e._id === id})[0];
        let data = {
            _product : product.id,
            title : product.title,
            price : product.price,
            quantity : 1
        } 
        let arr = this.state.products;
        arr.push(data)
        this.setState({products : arr})
        
    }

    removeProduct(id){
        let arr = []
        this.state.products.forEach((e, index) => {
            console.log('id: ' + id + ', index: ' + index + ' = ' + (Number(index) !== Number(id)));
            if(Number(index) !== Number(id)){
                
                arr.push(e)
            }
        });
        console.log(arr);
        
        this.setState({products : arr});
    }

    showProducts(){
        return this.state.products.map((e,index) => {
            return (<Product key={index} pd={e} remove={this.removeProduct} index={index}/>)
        })
    }

    total_price(){
        if(this.props.order.order) return this.props.order.order.total_price
        return "";
    }

    render(){        
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <form>
                            <fieldset disabled>
                                <InputField label="Usuario" value={this.props.user.name} responsive="disable"/>
                                <InputField label="Id" value={this.props.user.id} responsive="disable"/>
                            </fieldset>
                            <div className="form-group">
                                <label htmlFor="title">Cliente</label>
                                <select className="custom-select" ref={this.categoryRef}>
                                    <option value="">Seleccionar Cliente</option>
                                </select>
                            </div>
                            <div className="row">
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        {this.showProducts()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <InputField label="Impuestos"  responsive="col-6 col-md-4"/>
                                <InputField label="Total" value={this.total_price()} responsive="col-6 col-md-4"/>
                            </div>
                        </form>
                    </div>


                    <div className="col-12 col-md-6">
                        <div>
                            <form className="form-inline my-2 my-lg-0 form-searh">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                        <TableProducts products={this.props.products.docs} page={this.props.products.page} items={this.props.products.limit} add={this.addProduct}/>
                    </div>

                </div>
            </div>
        )
    }
}

class Product extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.remove(e.currentTarget.getAttribute('data-id'));
    }

    render(){
        return(
            <tr className="col-12">
                <td>
                    <button type="button" className="btn bg-danger" data-id={this.props.index} onClick={this.handleClick}>
                        <i className="material-icons">close</i>
                    </button>
                </td>
                <td>{this.props.pd.title}</td>
                <td>
                    <InputField value={this.props.pd.quantity}/>
                </td>
                <td>
                    <InputField value={"$ " + this.props.pd.price}/>
                </td>
            </tr>
        )
    }
}