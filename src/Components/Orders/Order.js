import React, { Component } from 'react';

// Components
import User from './User';
import Client from './Client';
import List from './Products/ListContainer';

class Order extends Component {
    render(){
        return(
            <div className="col-12 col-md-7">
                <User name={this.props.user.name} id={this.props.user.id}/>
                <Client 
                    clients={this.props.clients} 
                    client={this.props.client}
                    update={this.props.updateClient}
                    total={this.props.total}
                    save={this.props.save}
                />
                <List 
                    products={this.props.products}
                    delete={this.props.delete}
                    update={this.props.update}
                />
            </div>
        )
    }
}

export default Order