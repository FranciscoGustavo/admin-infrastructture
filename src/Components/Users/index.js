import React, { Component } from 'react';

// React Redux
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/adminActions';

// Components
import TableUsers from './Table';
import Modal from 'react-modal';
import Form from './Form';
import Pagination from '../Globals/Pagination';
import Search from '../Globals/Search';


class Users extends Component {
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen : false,
            user: {}
        }

        this.props.dispatch(actions.getAllUsers(false, this.props.user.jwt));
        
        this.opemModal = this.opemModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editUser = this.editUser.bind(this);
        this.newUser = this.newUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.numberPage = this.numberPage.bind(this);
        this.searching = this.searching.bind(this);
    }

    createUser(data){
        this.props.dispatch(actions.postUser(data, this.props.user.jwt));
        this.closeModal();
        this.props.dispatch(actions.getAllUsers(false, this.props.user.jwt));
    }

    updateUser(data, id){
        this.props.dispatch(actions.putUser(data, id, this.props.user.jwt));
        this.closeModal();
        this.props.dispatch(actions.getAllUsers(false, this.props.user.jwt));                                      
    }

    newUser(){
        this.setState({user : {}})
        this.opemModal();
    }

    editUser(id){
        let user = this.props.admin.docs.filter(e => { return  e._id === id})[0];
        console.log(user);
        this.setState({user})
        this.opemModal();
    }

    opemModal(){
        this.setState({modalIsOpen : true})
    }

    closeModal(){
        this.setState({modalIsOpen : false})
    }
    

    showTable(){
        if(this.props.admin.error){
            return (<h1>Error de conexion</h1>)
        }

        return <TableUsers 
            users={this.props.admin.docs} 
            edit={this.editUser} 
            page={this.props.admin.page} 
            items={this.props.admin.limit}
        />
    }

    showPagination(){
        if(this.props.admin.page){
            return <Pagination page={this.props.admin.page} pages={this.props.admin.pages} click={this.numberPage}/>
        }
    }

    numberPage(page){
        console.log(page);
        
        this.props.dispatch(actions.getAllUsers("page=" + page, this.props.user.jwt));
    }

    searching(text){
        this.props.dispatch(actions.findUser(text, this.props.user.jwt))
    }

    render(){
        return(
            <div className="container">
                <div className="row mb-4">
                    <div className="col">
                        <h1>Administra Usuarios</h1>
                    </div>
                </div>
                <div className="row mb-5    ">
                    <div className="col-md-6">
                        <Search search={this.searching}/>
                    </div>
                    <div className="col-md-6 text-right">
                        <button type="button" className="btn btn-primary add" onClick={this.newUser}>
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
                    <Form us={this.state.user} create={this.createUser} update={this.updateUser}/>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return { admin : state.administrations, user : state.users }
}

export default connect(mapStateToProps)(Users) 