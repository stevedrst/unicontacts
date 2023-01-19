import React, {useState, useEffect, useMemo} from 'react';
import { OidcSecure, useOidcAccessToken, useOidc } from '@axa-fr/react-oidc';
import { getContacts } from '../api/requests'
import { IContact } from '../api/interfaces/contact';
import { ContactDetail } from '../components/contactDetail';
import { CreateContact, ICreateContact } from '../components/createContact';
import { ContactView } from '../components/contactView';
import { safe } from '../utils/safe';

export const Contacts: React.FunctionComponent = (props) => {
    const [data, setData] = useState<IContact[]>([]);
    const [filter, setFilter] = useState('');
    const [activeItem, setActiveItem] = useState<IContact>();

    useEffect(() => {
        fetchContacts();
      }, []);
      
    const fetchContacts = async (): Promise<void> => {

        const { result, error } = await safe<IContact[]>(getContacts());

        if (!result || error) return;

        setData([...result]);
    }

    const selectActiveItem = (e: React.MouseEvent, id: number) => {
        let item = data.find(c => c.ID === id)
        setActiveItem(item);
     };

    const handleChange = (e: { target: { value: string; }; }) => {
        setFilter(e.target.value);
    };

    const contacts = useMemo(() => {
        return data.map((num, index) => {

            if (filter == "" || num.Info.Name.toLowerCase().includes(filter.toLowerCase())) {
                return(
                    <ContactDetail
                        key={index}
                        id={num.ID}
                        name={num.Info.Name}
                        phone={num.Info.DefaultPhone.Number}
                        email={num.Info.DefaultEmail.EmailAddress}
                        clickHandler={(e) => selectActiveItem(e, num.ID)} 
                    />
                )
            }
        })
    }, [filter, data]);
    
    return (
        <OidcSecure>
            <div style={{padding: "10px"}}>
            <h1>Contacts</h1>
                <div className="columns" style={{display:"flex", flexDirection:"row"}}>
                    <div className="column">
                        <div className="row">
                            <input id="filter"
                              name="filter"
                              type="text"
                              value={filter}
                              onChange={handleChange}
                            />
                            <div className="columns">
                                {contacts}
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row">
                            <CreateContact contactCreated={(contact: ICreateContact) => console.log(contact)} />
                        </div>
                    </div>
                    <div className="column">
                        <div className="row">
                            {activeItem != null && 
                                <ContactView
                                    key={activeItem.ID}
                                    id={activeItem.ID}
                                    name={activeItem.Info.Name}
                                    email={activeItem.Info.DefaultEmail.EmailAddress}
                                    phone={activeItem.Info.DefaultPhone.Number}
                                    addressline1={activeItem.Info.InvoiceAddress.AddressLine1}
                                    infoID ={activeItem.InfoID}
                                    defaultPhoneID={activeItem.Info.DefaultPhoneID}
                                    defaultEmailID={activeItem.Info.DefaultEmailID}
                                />
                            }
                    </div> 
                </div>
            </div>
            </div>      
        </OidcSecure>
    )
}

export default Contacts