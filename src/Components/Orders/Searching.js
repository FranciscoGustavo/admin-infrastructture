import React from 'react'

// Components
import TableProducts from './Products/Table';
import Search from '../Globals/Search';

function Searching(props){
    return(
        <div className="col-12 col-md-5">
            <div className="row border border-primary">                        
                <div className="col-12 mb-3">
                    <Search search={props.search}/>
                </div>
                <div className="col-12">
                    <TableProducts 
                        products={props.products} add={props.add}/>
                </div>
            </div>
        </div>
    )
}

export default Searching