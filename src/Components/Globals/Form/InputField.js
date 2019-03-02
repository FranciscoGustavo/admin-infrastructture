import React, { Component } from 'react';

export default class InputField extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        if(this.props.mode === "number"){
            if(!isNaN(e.target.value)){ 
                this.setState({value: e.target.value});
            } else {
                e.target.value = "";
                this.setState({value: e.target.value});
                alert('Solo puedes introducir numeros');
            }
        } else {
            this.setState({value: e.target.value});
        }
    }

    render(){
        return(
            <div className={"form-group " + (this.props.responsive || "")}>
                <label htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <input 
                    type={this.props.type || "text"} 
                    className="form-control" 
                    id={this.props.id} 
                    defaultValue={this.state.value} 
                    ref={this.props.RefValue} 
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}