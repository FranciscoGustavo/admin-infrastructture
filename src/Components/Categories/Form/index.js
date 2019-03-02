import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props){
        super(props);

        /*
        ==================================================
                        Creating Refs          
        ==================================================
        */
        this.titleRef = React.createRef();

        /*
        ==================================================
                        Binding Functions           
        ==================================================
        */
        this.handdleSubmit = this.handdleSubmit.bind(this);
    
    }


    /*===============================================
    *                    EVENTOS                    *
    ===============================================*/
    handdleSubmit(e){
        e.preventDefault();

        let data = {
            title: this.titleRef.current.defaultValue,
        }

        if(this.props.ct.slug){
            this.props.update(data, this.props.ct.slug);
        } else{
            this.props.create(data);
        }
    }


    /*
     *
     * Verificamos el valor de las propiedades 
     * y retornamos un valor ya seas cadena vacia 
     * o el valor valido
     *
    */

    title(){
        if(this.props.ct.title) return this.props.ct.title;
        return "";
    }

    render(){
        return(
            <form onSubmit={this.handdleSubmit}>
                
                        
                <InputField label="Titulo" RefValue={this.titleRef} id="title" value={this.title()}/>
                <button type="submit" className="btn btn-primary">Guardar</button>
                
               
            </form>
        )
    }
}

class InputField extends Component {
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
            <div className={"form-group" + (this.props.responsive || "")}>
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
