import React, { Component } from 'react';

// Actions
//import * as req from '../../../request/categories';

// Components 
import InputField from '../../Globals/Form/InputField';

export default class Form extends Component {
    constructor(props){
        super(props); 
        /*
        ==================================================
                        Creating Refs          
        ==================================================
        */

        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.imageRef = React.createRef();
        this.adminRef = React.createRef();
        this.passwordRef = React.createRef();

        /*
        ==================================================
                        Binding Functions           
        ==================================================
        */
        this.handdleChange = this.handdleChange.bind(this);
        this.handdleSubmit = this.handdleSubmit.bind(this);
    
    }

    /*===============================================
    *                    EVENTOS                    *
    ===============================================*/

    handdleChange(e) {
        let files = e.target.files;
		let image = files[0];
        let imageURL = URL.createObjectURL(image);
        document.querySelector('.imageCover').style.backgroundImage = "url('"+imageURL+"')";
    }

    handdleSubmit(e){
        e.preventDefault();

        console.log(this.adminRef);
        

        let data = {
            image: {},
            name: this.nameRef.current.defaultValue,
            email: this.emailRef.current.defaultValue,
            password: null,
            admin: this.adminRef.current.defaultChecked
        }

        if(this.imageRef.current.files[0]) {
            data.image = this.imageRef.current.files[0];
        } else {
            delete data.image
        }

        if(this.passwordRef.current.defaultValue !== ""){
            data.password = this.passwordRef.current.defaultValue;
        } else {
            delete data.password
        }

        console.log(data)

        if(this.props.us._id){
            console.log(this.props.us);
            
            this.props.update(data, this.props.us._id);
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

    name(){
        if(this.props.us.name) return this.props.us.name;
        return "";
    }

    email(){
        if(this.props.us.email) return this.props.us.email;
        return "";
    }

    admin(){
        if(this.props.us.admin) return this.props.us.admin
        return false
    }

    image(){
        if(this.props.us.photo) return 'url('+this.props.us.photo+')';
        return "url(https://user-images.githubusercontent.com/16608864/35882949-bbe13aa0-0bab-11e8-859c-ceda3b213818.jpeg)";
    }

    render(){
        return(
            <form onSubmit={this.handdleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-4">

                        <div className="form-row mb-3">
                            <div className="imageCover mb-3" style={{backgroundImage:this.image()}}></div>
                            <input type="file" id="image" style={{display:'none'}} onChange={this.handdleChange} ref={this.imageRef}/>
                            <label htmlFor="image" className="btn btn-primary m-auto">Selecciona una imagen</label>
                        </div>


                    </div>

                    <div className="col-12 col-md-8">
                        
                        
                        <InputField label="Nombre" RefValue={this.nameRef} id="title" value={this.name()}/>

                        <InputField label="Email" RefValue={this.emailRef} id="description" value={this.email()}/>

                        <InputCheck label="Administrador" RefValue={this.adminRef} id="admin" value={this.admin()}/>

                        <InputField label="Contraseña" RefValue={this.passwordRef} id="password" value=""/>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>

                    </div>
                </div>
                
               
            </form>
        )
    }
}

class InputCheck extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        console.log(e.target.checked);

        
        this.setState({value: e.target.checked});
    }

    render(){
        return(

            <div className="custom-control custom-checkbox form-group">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id={this.props.id} 
                    defaultChecked={this.state.value} 
                    ref={this.props.RefValue}
                    onChange={this.handleChange} 
                    />
                <label className="custom-control-label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
            </div>
        )
    }
}
