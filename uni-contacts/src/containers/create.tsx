import { OidcSecure } from '@axa-fr/react-oidc';
import React, {useState, useEffect, useMemo} from 'react';
import { CreateContact, ICreateContact } from '../components/createContact';

export const Create: React.FunctionComponent = (props) => {

    return(
        <OidcSecure> 
            <div>
            <div className="columns" style={{margin:"8px", display: 'flex'}}>
                <div className="column" style={{width: "10rem"}}></div>
                <div className="column" style={{float: "left", margin:"8px"}}>
                </div>
                <div className="column" style={{marginTop:"20px", float:"left"}}>
                <h1>Create Contact</h1>
                <CreateContact contactCreated={(contact: ICreateContact) => console.log(contact)} />
            </div>
            </div>
            </div>
        </OidcSecure>
    )
}

export default Create;