import React, { Component } from 'react';

// React Redux
import { connect } from 'react-redux';

// Actions
import * as actions from '../actions/usersActions';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            emailValue : "",
            passwordValue : ""
        }

        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();


        this.handleSumbmit = this.handleSumbmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSumbmit(e){
        e.preventDefault();

        let data = {
            email: this.emailRef.current.defaultValue,
            password: this.passwordRef.current.defaultValue
        }

        this.props.dispatch(actions.getSessionUser(data));
    }


    handleChange(e){
        if(e.target.type === 'email'){
            this.setState({emailValue: e.target.value});
        } else if( e.target.type === 'password'){
            this.setState({passwordValue: e.target.value});
        }
    }

    render(){
        return(
            <div className="log-in">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-10 col-md-4 form shadow-lg">
                        <h3>Inicia Sesión</h3>
                        <form onSubmit={this.handleSumbmit}>
                            <div className="form-group">
                                <label htmlFor="email">Correo electronico</label>
                                <input 
                                    id="email" 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter email" 
                                    ref={this.emailRef}
                                    defaultValue={this.state.emailValue}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input 
                                    id="password" 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password" 
                                    ref={this.passwordRef} 
                                    defaultValue={this.state.passwordValue}
                                    onChange={this.handleChange}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Entar</button>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {}
}

export default connect(mapStateToProps)(Login);