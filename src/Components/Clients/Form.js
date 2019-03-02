import React, { Component } from 'react';

// Actions

export default class Form extends Component {
    constructor(props){
        super(props);

        /*
        ==================================================
                        Creating Refs          
        ==================================================
        */
        this.imageRef = React.createRef();
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.addressRef = React.createRef();
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
        console.log(this.emailRef);
        console.log(this.addressRef);
        
        
        let data = {
            image: [],
            name: this.nameRef.current.defaultValue,
            email: this.emailRef.current.defaultValue,
            address: this.addressRef.current.defaultValue
        }

        if(this.imageRef.current.files[0]) {
            data.image = this.imageRef.current.files[0];
        } else {
            delete data.image;
        }

        if(this.passwordRef.current.defaultValue !== ""){
            data.password = this.passwordRef.current.defaultValue;
        } else {
            delete data.password;
        }

        console.log(data)

        if(this.props.cl._id){
            this.props.update(data, this.props.cl._id);
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

    image(){
        if(this.props.cl.photo) return 'url('+this.props.cl.photo+')';
        return "url(https://user-images.githubusercontent.com/16608864/35882949-bbe13aa0-0bab-11e8-859c-ceda3b213818.jpeg)";
    }

    name(){
        if(this.props.cl.name) return this.props.cl.name;
        return ""; 
    }

    email(){
        if(this.props.cl.email) return this.props.cl.email;
        return "";
    }

    address(){
        if(this.props.cl.address) return this.props.cl.address;
        return ""
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
                        
                        
                        <InputField label="Nombre" RefValue={this.nameRef} id="name" value={this.name()}/>
                        
                        <InputField label="Correo Electronico" RefValue={this.emailRef} id="email" value={this.email()}/>
                        
                        <InputField label="Dirección" RefValue={this.addressRef} id="address" value={this.address()}/>

                        <InputField type="password" label="Contraseña" RefValue={this.passwordRef} id="password" value=""/>
                      
                        <button type="submit" className="btn btn-primary">Guardar</button>

                    </div>
                </div>
                
               
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