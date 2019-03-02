import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props){
        super(props);

        this.searchRef = React.createRef(); 

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.search(e.target.value);
    }

    render(){
        return (
            <form className="form-inline my-2 my-lg-0 form-searh">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleChange} ref={this.searchRef}/>
            </form>
        )
    }
}