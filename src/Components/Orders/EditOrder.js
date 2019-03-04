import React, { Component } from 'react';

// React Redux
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Actions
import * as req from '../../request/orders';
import * as clients from '../../actions/clientsActions';
import * as order from '../../actions/ordersActions';
import * as search from '../../actions/searchActions';

// Components
import Order from './Order';
import Searching from './Searching';

class NewOrder extends Component {
    constructor(props){
        super(props)       

        this.state = {
            total : 0,
            client : {},
            products : [],

        }

        this.loadProducts();

        // Binding of functions
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.upadteProduct = this.upadteProduct.bind(this);
        this.updateTotalPrice = this.updateTotalPrice.bind(this);
        this.updateClient = this.updateClient.bind(this);
        this.save = this.save.bind(this);

        this.searchProducts = this.searchProducts.bind(this);
    }

    loadProducts(){
        req.getOrder(this.props.match.params.id, this.props.user.jwt)
        .then(res => {            
            this.setState({products : res.products})   
            this.setState({client : res.client[0]})    
            this.setState({total : res.order.total_price})           
        })
    }

    componentDidMount(){
        this.props.dispatch(clients.getAllClients(false, this.props.user.jwt))
    }

    // Add poduct to array
    addProduct(id){
        let product = this.props.products.filter(e => {return e._id === id})[0];
        
        let products = this.state.products
        products.push({
            _product : product._id,
            price: product.price,
            title: product.title,
            unity: product.unity,
            quantity: 1,
            total : product.price * 1
        });
        
        this.setState({products})
        this.updateTotalPrice();
    }

    // Delete product of array
    removeProduct(id){
        let products= this.state.products.map((e,index) => {
            if(Number(index) !== Number(id)) return e;
            return false
        })
      

        this.setState({products});
        setTimeout(()=>{
            this.updateTotalPrice();
        }, 500);
    }

    // Update a product of array
    upadteProduct(id, quantity){
        let products = this.state.products;
        // console.log(products[Number(id)]);
        
        products[Number(id)].quantity = quantity;
        products[Number(id)].total = (products[Number(id)].quantity * products[Number(id)].price)
        
        //console.log(products[Number(id)]);
        
        this.setState({products});
        this.updateTotalPrice();
    }

    // Update of price total of order
    updateTotalPrice(){
        let total = this.state.products.map(e => {
            if(e !== false) return e.total 
            return  0 
        }).reduce((a,b)=>{return a+b})
              
        this.setState({total})
    }


    updateClient(id){
        let client = this.props.clients.docs.filter(e => { return e._id === id})
        this.setState({client})
    }
    
    save(){
        let products = this.state.products.filter(e => {
            return e !== false
        }).map(e => {
            return {
                _product : e._product,
                price : e.price,
                quantity : e.quantity
            }
        })

        this.props.dispatch(
            order.putOrder(this.props.match.params.id, {'products' : products } , this.props.user.jwt)
        );

        this.props.dispatch(push('/pedidos'));


        
    }

    // Search Products
    searchProducts(text){
        if(text !== "") this.props.dispatch(search.findProducts(text))
    }

    render(){
        return (
            <div className="container edit-order">
                <div className="row">
                    <Order 
                        clients={this.props.clients.docs}
                        client={this.state.client}
                        user={this.props.user.user}
                        products={this.state.products}
                        delete={this.removeProduct}
                        update={this.upadteProduct}
                        updateClient={this.updateClient}
                        total={this.state.total}
                        save={this.save}
                    />
                    <Searching 
                        search={this.searchProducts} 
                        products={this.props.products}
                        add={this.addProduct}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return { 
        user : state.users,
        clients : state.clients,
        products : state.search,
        order : state.orders  
    }
}

export default connect(mapStateToProps)(NewOrder);