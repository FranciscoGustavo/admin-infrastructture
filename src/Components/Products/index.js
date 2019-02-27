import React, { Component } from 'react';
import Modal from 'react-modal';

// Redux
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/productsActions';

// Components
import TableProducts from './Table';
import Form from './Form';
import Pagination from './Pagination';

class Products extends Component {
    constructor(props){
        super(props)

        this.state = {
            modalIsOpen : false,
            product : {},
            message : 'Nuevo Producto'
        }

        this.props.dispatch(actions.getAllProducts());

        this.editProduct = this.editProduct.bind(this);
        this.newProduct = this.newProduct.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.numberPage = this.numberPage.bind(this);
    }

    updateProduct(data, slug){
        this.props.dispatch(actions.putOneProduct(data, this.props.users.jwt, slug));
        this.closeModal();
    }

    createProduct(data){
        this.props.dispatch(actions.postOneProduct(data, this.props.users.jwt));
        this.closeModal();
    }

    newProduct(){
        this.setState({product : {}});
        this.setState({message:'Nuevo Producto'})
        this.openModal();
    }

    editProduct(id){
        const product = this.props.products.docs.filter(e => {return e._id === id})[0]
        this.setState({product});
        this.setState({message:product.title});
        this.openModal();
    }

    openModal(){
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    showTable(){
        if(this.props.products.error){
            return (<h1>Error de conexion</h1>)
        }

        return <TableProducts products={this.props.products.docs} edit={this.editProduct}/>
    }

    showPagination(){
        if(this.props.products.page){
            return <Pagination page={this.props.products.page} pages={this.props.products.pages} click={this.numberPage}/>
        }
    }

    numberPage(page){
        this.props.dispatch(actions.getAllProducts("page="+page));
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
                        <button type="button" className="btn btn-primary add" onClick={this.newProduct}>
                            Agregar
                        </button>
                    </div>
                </div>
                
                {this.showTable()}
                
                {this.showPagination()}

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
                              width:'90%',
                              height:'80%',
                              maxWidth: '800px',
                              maxHeight: '800px',
                              transform: 'translate(-50%,-50%)'
                            }
                        }
                    }
                >
                    <div className="row">
                        <div className="col-12 d-flex align-items-center mb-3">
                            <button className="btn-close mr-3" onClick={this.closeModal}>
                                <i className="material-icons">close</i>
                            </button>

                            <h3>{this.state.message}</h3>
                        </div>
                        <div className="col-12">
                            <Form pd={this.state.product} update={this.updateProduct} create={this.createProduct}/>
                        </div>
                    </div>
                </Modal>



            </div>
        )
    }
}

function maspStateToProps(state, ownProps){
    return { products: state.products, users: state.users }
}

export default connect(maspStateToProps)(Products)