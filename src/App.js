import React, { Component } from 'react';

import Sidenav from './Components/Globals/Sidenav'
import Navbar from './Components/Globals/Navbar'


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      menu : ""
    }

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(){
    if(this.state.menu === "") return this.setState({menu : "active"});
    return this.setState({menu : ""});
  }

  render() {
    return (
      <div className="App">
        <Sidenav isActive={this.state.menu}/>
        <div className={"aside-container " + this.state.menu}>
          <Navbar handleClick={this.handleClick}/>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
