import React, { Component } from 'react';
import Modal from 'react-modal';

// Redux
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/clientsActions';

// Components
import TableClients from './Table';
import Form from './Form';


class Clients extends Component {
    constructor(props){
        super(props)

        this.state = {
            modalIsOpen: false,
            client: {},
            message: 'Nuevo Cliente'
        }

        this.props.dispatch(actions.getAllClients(false,this.props.users.jwt));

        this.createClient = this.createClient.bind(this);
        this.updateClient = this.updateClient.bind(this);


        this.newClient = this.newClient.bind(this);
        this.editClient = this.editClient.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    createClient(data){        
        this.props.dispatch(actions.postClients(data, this.props.users.jwt));
        setTimeout(()=>{
            this.props.dispatch(actions.getAllClients(false, this.props.users.jwt));
            this.closeModal();

        },1000);
    }

    updateClient(data,id){
        this.props.dispatch(actions.putClients(data, this.props.users.jwt, id));
        setTimeout(()=>{
            this.props.dispatch(actions.getAllClients(false, this.props.users.jwt));
            this.closeModal();
        },1000);
    }

    newClient(){
        this.setState({client:{}});
        this.setState({message:'Nuevo Cliente'});
        this.openModal()
    }

    editClient(id){
        const client = this.props.clients.docs.filter(e => {return e._id === id})[0];
        this.setState({client});
        this.setState({message: client.name});
        this.openModal()
    }

    openModal(){
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    showTable(){
        if(this.props.clients.error){
            return <h1>Error de conexión</h1>
        }

        return <TableClients clients={this.props.clients.docs} page={this.props.clients.page} items={this.props.clients.pages} edit={this.editClient}/>
    }


    render(){
        return(
            <div className="container products">
                <div className="row mb-4">
                    <div className="col">
                        <h1>Administra Clientes</h1>
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
                        <button type="button" className="btn btn-primary add" onClick={this.newClient}>
                            Agregar
                        </button>
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
                              width:'90%',
                              height:'80%',
                              maxWidth: '800px',
                              maxHeight: '800px',
                              transform: 'translate(-50%,-50%)'
                            }
                        }
                    }
                >
                    <Form cl={this.state.client} update={this.updateClient} create={this.createClient}/>
                </Modal>
                
            </div>
        )
    }
}

function maspStateToProps(state, ownProps){
    return { clients: state.clients, users: state.users }
}

export default connect(maspStateToProps)(Clients)