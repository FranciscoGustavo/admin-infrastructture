import React, { Component } from 'react';
import Modal from 'react-modal';

// Redux
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/categoriesActions';

// Components 
import TableCategories from './Table';
import Form from './Form';
import Pagination from '../Globals/Pagination';


class Categories extends Component {
    constructor(props){
        super(props)

        this.state = {
            modalIsOpen:false,
            category : {},
            message : 'Nueca Categoria'
        }

        this.props.dispatch(actions.getAllCategories());

        // Binding de functiones
        this.createCategory = this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.newCategory = this.newCategory.bind(this);
        this.numberPage = this.numberPage.bind(this);

    }

    /****************************************************
     *                Acciones (Editar, Nuevo)          *
     ***************************************************/
    createCategory(data){
        this.props.dispatch(actions.postCategories(data, this.props.users.jwt));
        this.closeModal();
    }

    updateCategory(data, slug){
        this.props.dispatch(actions.putCategories(data, this.props.users.jwt, slug));
        this.closeModal();
    }

    /****************************************************
     *                Eventos (Editar, Nuevo)           *
     ***************************************************/
    openModal(){
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    editCategory(id){
        const category = this.props.categories.docs.filter(e => {return e._id === id})[0];

        this.setState({category})
        this.setState({message:category.title});
        this.openModal();
    }

    newCategory(){
        this.setState({category:{}})
        this.setState({message:'Nueva Categoria'});
        this.openModal();
    }


    /****************************************************
     *                Reder de coponentes               *
     ***************************************************/
    showTable(){
        if(this.props.categories.error){
            return <h1>Error  de conexión</h1>
        }
        return <TableCategories 
            categories={this.props.categories.docs} 
            page={this.props.categories.page} 
            items={this.props.categories.limit}
            edit={this.editCategory}/>
    }

    showPagination(){
        if(this.props.categories.page){
            return <Pagination page={this.props.categories.page} pages={this.props.categories.pages} click={this.numberPage}/>
        }
    }

    numberPage(page){
        console.log(page);
        
        this.props.dispatch(actions.getAllCategories("page=" + page));
    }

    render(){
        return(
            <div className="container products">
                <div className="row mb-4">
                    <div className="col">
                        <h1>Administra Categorias</h1>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <form className="form-inline my-2 my-lg-0 form-searh">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col-md-6 text-right">
                        <button type="button" className="btn btn-primary add" onClick={this.newCategory}>
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
                    <Form 
                    ct={this.state.category}
                    create={this.createCategory}
                    update={this.updateCategory}/>
                </Modal>

            </div>
        )
    }
}

function maspStateToProps(state, ownProps){
    return { categories: state.categories, users: state.users }
}

export default connect(maspStateToProps)(Categories)