import React, { Component } from 'react';

// Actions
import * as req from '../../../request/categories';

export default class Form extends Component {
    constructor(props){
        super(props);

        this.state = {
            categories : [],
            unity : ['KG','DM','MNJ','PZ']
        }
    
        this.loadCategories();

        /*
        ==================================================
                        Creating Refs          
        ==================================================
        */

        this.imageRef = React.createRef();
        this.titleRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.categoryRef = React.createRef();
        this.unityRef = React.createRef();
        this.priceRef = React.createRef();

        /*
        ==================================================
                        Binding Functions           
        ==================================================
        */
        this.handdleChange = this.handdleChange.bind(this);
        this.handdleSubmit = this.handdleSubmit.bind(this);
    
    }

    loadCategories(){
        req.getAllCategories()
        .then(res => {
            this.categories = res;
            this.setState({categories : res.docs});
        })
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

        let data = {
            image: {},
            title: this.titleRef.current.defaultValue,
            description: this.descriptionRef.current.defaultValue,
            unity: this.unityRef.current.selectedOptions[0].value,
            price: this.priceRef.current.defaultValue,
            _category: this.categoryRef.current.selectedOptions[0].value
        }

        if(this.imageRef.current.files[0]) {
            data.image = this.imageRef.current.files[0];
        } else {
            delete data.image
        }

        //console.log(data)

        if(this.props.pd.slug){
            this.props.update(data, this.props.pd.slug);
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
        if(this.props.pd.title) return this.props.pd.title;
        return "";
    }

    description(){
        if(this.props.pd.description) return this.props.pd.description;
        return "";
    }

    image(){
        if(this.props.pd.avatarImage) return 'url('+this.props.pd.avatarImage+')';
        return "url(https://user-images.githubusercontent.com/16608864/35882949-bbe13aa0-0bab-11e8-859c-ceda3b213818.jpeg)";
    }

    category(id){
        if(this.props.pd._category) {
            if(id) return this.props.pd._category._id;
            return this.props.pd._category.title;
        }
        return "Slecciona una opcion";
    }

    unity(){
        if(this.props.pd.unity) return this.props.pd.unity;
        return "Slecciona una opcion";
    }

    price(){
        if(this.props.pd.price) return this.props.pd.price.toString();
        return "";
    }


    /*
     *
     * Hacemos render de la opciones de seleccion 
     *
    */

    // Opciones de unidad
    unityOptions(){
        let unity;
        if(this.props.pd.unity) {
            unity = this.state.unity.filter(e => {return e !== this.props.pd.unity});
        } else {
            unity = this.state.unity;
        }
        return unity.map((e,index)=>{
            return (
                <option key={index} value={e}>{e}</option>
            );
        });
    }

    // Opciones de categorias 
    categoryOptions(){
        if(this.state.categories){
            return this.state.categories.map((e,index) => {
                let JSXElement;
                if(!this.props.pd._category){
                    JSXElement = <option key={index} value={e._id}>{e.title}</option>;
                }else if(this.props.pd._category._id !== e._id){
                    JSXElement = <option key={index} value={e._id}>{e.title}</option>;
                }
                return JSXElement; 
            })
        } 
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
                        
                        
                        <InputField label="Titulo" RefValue={this.titleRef} id="title" value={this.title()}/>
                        <TextArea label="Descripción" RefValue={this.descriptionRef} id="description" value={this.description()}/>

                        <div className="form-row">
                            <div className="form-group col-12 col-sm-4">
                                <label htmlFor="title">Categoria</label>
                                <select className="custom-select" ref={this.categoryRef}>
                                    <option value={this.category(true)}>{this.category(false)}</option>
                                    {this.categoryOptions()}
                                </select>
                            </div>
                            <div className="form-group col-12 col-sm-4">
                                <label htmlFor="title">Unidad</label>
                                <select className="custom-select" ref={this.unityRef}>
                                    <option value={this.unity()}>{this.unity()}</option>
                                    {this.unityOptions()}
                                </select>
                            </div>

                            <InputField mode="number" label="Precio" RefValue={this.priceRef} id="price" value={this.price()} responsive="col-12 col-sm-4"/>

                        </div>
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

class TextArea extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    render(){
        return(
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <textarea 
                    className="form-control"
                    id={this.props.id}
                    defaultValue={this.state.value}
                    ref={this.props.RefValue}
                    onChange={this.handleChange}
                >
                    
                </textarea>
            </div>
        )
    }
}