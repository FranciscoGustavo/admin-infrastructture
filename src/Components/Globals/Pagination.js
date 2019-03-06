import React, { Component } from 'react';

export default class Pagination extends Component {
    constructor(props){
        super(props);

        this.state = {
            pageNow : this.props.page,
            numberPages : this.props.pages
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        if(e.target.getAttribute('data-less')){

            if(this.state.pageNow !== 1){
                this.setState({pageNow: this.state.pageNow-1});
                this.props.click(this.state.pageNow-1);
            }

        } else if(e.target.getAttribute('data-page')){

            this.setState({pageNow: Number(e.target.getAttribute('data-page'))});
            this.props.click(e.target.getAttribute('data-page'));

        } else if(e.target.getAttribute('data-more')){
            if(this.state.pageNow !== this.state.numberPages){
                this.setState({pageNow: this.state.pageNow+1});
                this.props.click(this.state.pageNow+1);
            }
        }
    }

    showButtonsPage(){
        let pages = [];
        for(let i = 1; i <= this.state.numberPages; i++){
            pages[i-1] = i;
        }

        return pages.map((e,index) => {
            let active;
            if(e === this.state.pageNow){
                active = 'active';
            }
            else {
                active = '';
            }
            return (
                <li key={index} className={"page-item " + active}>
                    <button className="page-link" data-page={e} onClick={this.handleClick}>{e}</button>
                </li>
            )
        })
    }

    render(){
        return(
            <div className="row">
                <div className="m-auto">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link" data-less="1" onClick={this.handleClick}>Previous</button>
                            </li>
                                {this.showButtonsPage()}
                            <li className="page-item">
                                <button className="page-link" data-more="1" onClick={this.handleClick}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}