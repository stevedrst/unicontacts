import { OidcSecure } from '@axa-fr/react-oidc';
import Oidc from '@axa-fr/react-oidc/dist/vanilla/oidc';
import React, {useState, useEffect, useMemo, FormEvent} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { IContact } from '../api/interfaces/contact';
import { getSingleContact } from '../api/requests';
import { Center } from '../components/center';
import { ContactView } from '../components/contactView';
import { safe } from '../utils/safe';

interface IDetailViewProps {
    // contact?: IContact
}
let styles = require('./view.css');

export const View: React.FunctionComponent<IDetailViewProps>= (props) => {

    const { state } = useLocation();
    const [activeContact, setActiveContact] = useState<IContact>(state);
    const [searchParams, setSearchParams] = useSearchParams();
    let id: any = 0;
    let paramId: any = searchParams.get("id")

    useEffect(() => {
        fetchSingleContact(paramId);
      }, []);

      const fetchSingleContact = async(id: any): Promise<void> => {
        if ( id !== "0" || id!== undefined) {
            const { result, error } = await safe<any>(getSingleContact(id));

            if (!result || error) return;
            searchParams.set("id", id)
            setSearchParams(searchParams);
            setActiveContact(result)
        }
      }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if ( id !== "0" || id!== undefined) {
            let result = await fetchSingleContact(id);
        }
    }
    
    return(
        <OidcSecure>
            <div className="columns" style={{margin:"8px", display: 'flex'}}>
                <div className="column" style={{width: "10rem"}}></div>
                <div className="column" style={{float: "left", margin:"8px"}}>
                <h1>Contact detail</h1>
                    <div className="row"></div>
                        <p>Search contact by ID</p>
                        <form id="search-form" className="field" onSubmit={handleSubmit}>
                    <p className="control has-icons-left has-icons-right">
                      <input  className="input" type="id" placeholder="id" onChange={ (e) => id = e.target.value} />
                    </p>
                    <div className="field">
                        <p className="control">
                            <button className="button is-success" style={{borderRadius:"50px"}}>
                                Search
                            </button>
                        </p>
                    </div>
                  </form>
                </div>
                <div className="column" style={{marginTop:"90px"}}>
                        <div>
                        {!activeContact ? <div></div> :
                        <div>
                            <ContactView
                                key={activeContact.ID}
                                id={activeContact.ID}
                                name={activeContact.Info.Name}
                                email={activeContact.Info.DefaultEmail.EmailAddress}
                                phone={activeContact.Info.DefaultPhone.Number}
                                addressline1={(activeContact.Info.InvoiceAddress === null || activeContact.Info.InvoiceAddress === undefined) ? "Unspecified" : activeContact.Info.InvoiceAddress.AddressLine1 }
                                infoID ={activeContact.InfoID}
                                defaultPhoneID={activeContact.Info.DefaultPhoneID}
                                defaultEmailID={activeContact.Info.DefaultEmailID}
                                city={(activeContact.Info.InvoiceAddress === null || activeContact.Info.InvoiceAddress === undefined) ? "Unspecified" : activeContact.Info.InvoiceAddress.City}
                                country={(activeContact.Info.InvoiceAddress === null || activeContact.Info.InvoiceAddress === undefined) ? "Unspecified" : activeContact.Info.InvoiceAddress.Country}
                                postal={(activeContact.Info.InvoiceAddress === null || activeContact.Info.InvoiceAddress === undefined) ? "Unspecified" : activeContact.Info.InvoiceAddress.PostalCode}
                            />
                        </div>}
                        </div>
                    </div>
                </div>
        </OidcSecure>
    )
}

export default View;