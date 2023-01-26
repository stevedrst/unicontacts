import React, {useState, useEffect, useMemo, MouseEventHandler} from 'react';
import { OidcSecure, useOidcAccessToken, useOidc } from '@axa-fr/react-oidc';
import { getContacts, getFilteredContacts, getSortedContactsAscended, getSortedContactsDescended } from '../api/requests'
import { IContact } from '../api/interfaces/contact';
import { ContactGrid } from '../components/contactGrid';
import { CreateContact, ICreateContact } from '../components/createContact';
import { ContactView } from '../components/contactView';
import { safe } from '../utils/safe';
import { useNavigate } from "react-router-dom";
import ArrowUp from './../icons/ArrowUp.png';
import ArrowDown from './../icons/ArrowDown.png';

let styles = require('./contacts.css');

export const Contacts: React.FunctionComponent = (props) => {
    const [data, setData] = useState<IContact[]>([]);
    const [filter, setFilter] = useState('');
    const [activeItem, setActiveItem] = useState<IContact>();
    const navigate = useNavigate();
    const [sort, setSort] = useState("");

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
        navigate("/View?id=" + id);
     };

    const handleChange = (e: { target: { value: string; }; }) => {
        fetchFilteredContacts(e.target.value);
        // setFilter(e.target.value);
    };

    const toggleSort = () => {
        switch(sort) {
            case '': 
                setSort("down");
                fetchSortedContactsAscended();
                break;
            case 'down':
                setSort("up");
                fetchSortedContactsDescended();
                break;
            case 'up': 
                setSort("down")
                fetchSortedContactsAscended();
                break;
            default: 
                setSort("");
                break;
        }
    }
    const fetchSortedContactsDescended = async(): Promise<void> => {
        const { result, error } = await safe<IContact[]>(getSortedContactsDescended());

        if (!result || error) return;

        setData([...result]);
    }
    const fetchSortedContactsAscended = async(): Promise<void> => {
        const { result, error } = await safe<IContact[]>(getSortedContactsAscended());

        if (!result || error) return;

        setData([...result]);
    }
    const fetchFilteredContacts = async (query: string): Promise<void> => {
        const { result, error } = await safe<IContact[]>(getFilteredContacts(query));

        if (!result || error) return;

        setData([...result]);
    }
    const toCreate = () =>{ 
        let path = `/Create`; 
        navigate(path);
      }
    const contacts = useMemo(() => {
        return data.map((num, index) => {

                return(
                    <ContactGrid
                        key={index}
                        id={num.ID}
                        name={num.Info.Name}
                        phone={num.Info.DefaultPhone.Number}
                        email={num.Info.DefaultEmail.EmailAddress}
                        addressLine1={(num.Info.InvoiceAddress === null || num.Info.InvoiceAddress === undefined) ? "Unspecified" : num.Info.InvoiceAddress.AddressLine1  }
                        city={(num.Info.InvoiceAddress === null || num.Info.InvoiceAddress === undefined) ? "Unspecified" : num.Info.InvoiceAddress.City}
                        country={(num.Info.InvoiceAddress === null || num.Info.InvoiceAddress === undefined) ? "Unspecified" : num.Info.InvoiceAddress.Country}
                        postal={(num.Info.InvoiceAddress === null || num.Info.InvoiceAddress === undefined) ? "Unspecified" : num.Info.InvoiceAddress.PostalCode}
                        clickHandler={(e) => selectActiveItem(e, num.ID)} 
                    />
                )
        })
    }, [data]);
    
    return (
        <OidcSecure>
            <div style={{padding: "10px"}}>
            <h1>Contacts</h1>
                        <div>
                            <div style={{width:"100rem"}}>
                                <input placeholder="Search" style={{width: "14rem", height:"2rem"}}
                                  onChange={handleChange}
                                />
                                <button style={{float: "right", background:"#324960", color:"#ffffff", padding:"12px", cursor:"pointer"}} onClick={toCreate}>Add new contact</button>
                                </div>
                            <br></br>
                            <br></br>
                            
                            <div className="table-wrapper">
                            <table className="fl-table">
                                <thead>
                                <tr>
                                    {(sort === "up") && <th onClick={(e) => {toggleSort()}}>Name<img style={{float: 'right'}} src={ArrowDown} alt="" height='8' width='8'></img></th>}
                                    {(sort === "down") && <th onClick={(e) => {toggleSort()}}>Name<img  style={{float: 'right'}} src={ArrowUp} alt="" height='8' width='8'></img></th>}
                                    {(sort === "") && <th onClick={(e) => {toggleSort()}}>Name<img  style={{float: 'right'}} src={ArrowDown} alt="" height='8' width='8'></img></th>}
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>Postal</th>
                                    <th>Country</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {contacts}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
        </OidcSecure>
    )
}

export default Contacts