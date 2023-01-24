import { OidcSecure } from '@axa-fr/react-oidc';
import React, {useState, useEffect, useMemo} from 'react';
import { CreateContact, ICreateContact } from '../components/createContact';

export const Create: React.FunctionComponent = (props) => {

    return(
        <OidcSecure> 
            <div className="center">
                <CreateContact contactCreated={(contact: ICreateContact) => console.log(contact)} />
            </div>
        </OidcSecure>
    )
}

export default Create;