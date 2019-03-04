import React, { Component } from 'react';

export default class Client extends Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        this.props.update(e.currentTarget.value)
    }

    handleClick(){
        this.props.save();
    }

    showClient(){
        if(this.props.clients){
            return this.props.clients.map((e, index) => {
                if(this.props.client._id !== e._id){
                    return (
                        <option key={index} value={e._id}>{e.name}</option>
                    )
                } else {
                    return false
                }
                
            })  
        }
        
    }

    render(){
        return(
            <div className="row">

                <div className="form-group col-md-5">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="material-icons">account_circle</i>
                            </div>
                        </div>
                        <select className="custom-select" onChange={this.handleChange}>
                            <option value={this.props.client._id} >{this.props.client.name}</option>
                            {this.showClient()}
                        </select>
                    </div>   
                </div>

                <div className="form-group col-md-2">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">%</div>
                        </div>
                        <input type="text" className="form-control" defaultValue=""/>
                    </div>
                </div>

                <div className="form-group col-md-3">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <div className="from-control">
                            {this.props.total}
                        </div>
                    </div>
                </div>

                <div className="form-group col-md-2">
                    <button className="btn btn-primary w-100" onClick={this.handleClick}>Guardar</button>
                </div>

            </div>
        )
    }
}