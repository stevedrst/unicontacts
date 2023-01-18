import React, {useState, useEffect} from 'react';
import { OidcSecure, useOidcAccessToken, useOidc } from '@axa-fr/react-oidc';
import { getContacts } from '../api/requests'
import { Contact } from '../api/interfaces/contact';

export const Contacts: React.FunctionComponent = (props) => {
    const { accessToken} = useOidcAccessToken();
    const [data, setData] =useState<Contact[]>([]);

    useEffect(() => {
        fetchContacts();
      }, []);
      const fetchContacts = async (): Promise<void> => {

          let result = await getContacts(accessToken).catch( (e: Error) => {
            console.error(e + "error")
        });
        if (!result) {
            return;
        }
        setData([...result]);
    } 

    return (
        <OidcSecure>
            <div>
                <h1>Contacts</h1>
            </div>       
        </OidcSecure>
    )
}

export default Contacts