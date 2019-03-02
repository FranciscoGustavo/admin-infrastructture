import React, { Component } from 'react';
import Modal from 'react-modal';

// Router Dom
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/ordersActions';
import * as products from '../../actions/productsActions';
import * as req from '../../request/orders';

// Components
import TableOrders from './TableOrders';
import Form from './Form';


class Orders extends Component {
    constructor(props){
        super(props)

        this.state = {
            modalIsOpen : false,
            order : {},
            message : 'Nueva Orden'
        }

        this.props.dispatch(actions.getAllOrders(false, this.props.users.jwt));

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.newOrder = this.newOrder.bind(this);
    }

    newOrder(){
        
        this.setState({order : {}});
        this.setState({message:'Nuevo Pedido'});
        this.openModal();
    }

    editOrder(id){
        req.getOrder(id, this.props.users.jwt)
        .then(res => {            
            this.props.dispatch(products.getAllProducts());
            const order = res;
            this.setState({order});
            this.setState({message:'Editando'});
            this.openModal();
        }) 
        //const order = this.props.orders.docs.filter(e => {return e._id === id})[0];
    }

    openModal(){
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    showTable(){
        if(this.props.orders.error){
            return <h1>Error de conexión</h1>
        }        
        return <TableOrders orders={this.props.orders.docs} page={this.props.orders.page} items={this.props.orders.limit} edit={this.editOrder}/>
    }

    render(){
        return(
            <div className="container products">
                <div className="row mb-4">
                    <div className="col">
                        <h1>Administra Pedidos</h1>
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
                        <Link to="/pedidos/nuevo" type="button" className="btn btn-primary add">
                            Agregar
                        </Link>
                    </div>
                </div>

                {this.showTable()}

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    style={
                        {
                            overlay: {
                              backgroundColor: 'rgba(0,0,0,0.8)'
                            },
                            content: {
                              top:'50%',
                              left:'50%',
                              width:'100%',
                              height:'100%',
                              transform: 'translate(-50%,-50%)'
                            }
                        }
                    }
                >
                    <Form order={this.state.order} user={this.props.users.user} products={this.props.products}/>
                </Modal>
            </div>
        )
    }
}

function maspStateToProps(state, ownProps){
    return { orders: state.orders, products: state.products, users: state.users }
}

export default connect(maspStateToProps)(Orders)