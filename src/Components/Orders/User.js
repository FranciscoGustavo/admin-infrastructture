import React from 'react';

// Components
import InputField from '../Globals/Form/InputField';

function User(props){
    return(
        <fieldset disabled>
            <div className="row">
                <InputField label="Usuario" value={props.name} responsive="col-6"/>
                <InputField label="Id" value={props.id} responsive="col-6"/>
            </div>
        </fieldset>
    )
}

export default User