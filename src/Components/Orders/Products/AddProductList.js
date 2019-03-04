import React, { Component } from 'react';

export default class List extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            total : this.props.pd.total,
            quantity : this.props.pd.quantity
        }
        
        this.quantityRef = React.createRef()

        this.handleClick = this.handleClick.bind(this);
        this.handleCahnge = this.handleCahnge.bind(this);
    }

    total(){        
        console.log('Hola: ');
        console.log(this.props);
        
        
        return (this.props.pd.price * this.props.pd.quantity).toLocaleString();
    }

    handleClick(e){
        this.props.delete(e.currentTarget.getAttribute('data-id'));
    }
    
    handleCahnge(e){
        this.props.update(this.props.id, e.currentTarget.value); 
        this.setState({quantity : e.currentTarget.value, total : (this.props.pd.price * this.props.pd.quantity)})
    }

    render(){
        return(
            <div className="col-12 p-0">
                <div className="row shadow m-3 p-3 align-items-center">
                    <div className="col-2">
                        <button type="button" className="btn text-white p-0" data-id={this.props.id} onClick={this.handleClick}>
                            <i className="material-icons bg-danger rounded-sm">close</i>
                        </button>
                    </div>
                    <div className="col-4 col-md-6">
                        <h6 className="md-h4">{this.props.pd.title}</h6>
                    </div>
                    <div className="col-3 col-md-2">
                        <div className="form-group mb-0">
                            <input 
                                type="number" 
                                className="form-control" 
                                id="price" 
                                defaultValue={this.state.quantity}
                                ref={this.quantityRef}
                                onChange={this.handleCahnge}
                            />
                        </div>
                    </div>
                    <div className="col-3 col-md-2">
                            <div className="form-group mb-0">
                                <p>{this.state.total}</p>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}