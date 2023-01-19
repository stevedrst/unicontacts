import { useOidcAccessToken } from '@axa-fr/react-oidc';
import React, { FormEvent } from 'react';
import { deleteContact, putContact } from '../api/requests';

interface IContactViewProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    addressline1: string;
    infoID: number;
    defaultEmailID: number;
    defaultPhoneID: number;
}

// TODO: Add CSS files.
export const ContactView: React.FunctionComponent<IContactViewProps> = (props) => {
    let name: string = props.name;
    let phone: string = props.phone;
    let email: string = props.email;
    let addressline1: string = props.addressline1;

    const { accessToken} = useOidcAccessToken();

    const handleEdit = async (e: FormEvent) => {
        e.preventDefault();
        let result = await putContact(props.id, props.infoID,props.defaultEmailID, props.defaultPhoneID, name, phone, email, addressline1, accessToken);
    }
    const handleDelete = async(e: FormEvent) => {
        e.preventDefault();
        let result = await deleteContact(props.id, accessToken);
    }
    return(
        <form id="create-form" className="field" onSubmit={handleEdit}>
            <div className="columns" style={{float: "left", fontSize:"60%", margin:"8px"}} >
                <div className="column" >
                    <div className="row">
                        Name
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder={props.name} onChange={ (e) => name = e.target.value} />
                    </div>
                    <div className="row">
                        Email
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder={props.email} onChange={ (e) => email = e.target.value} />
                    </div>
                    <div className="row">
                        Phone
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder={props.phone} onChange={ (e) => phone = e.target.value} />
                    </div>
                    <div className="row">
                        Addressline1
                    </div>
                    <div className="row">
                    <input style={{width:"240px"}}  className="input" type="title" placeholder={props.addressline1} onChange={ (e) => addressline1 = e.target.value} />
                    </div>
                    <div className="row">
                        City
                    </div>
                    {/* <div className="row">
                    <input style={{width:"240px"}}  className="input" type="title" value={props.city} onChange={ (e) => city = e.target.value} />
                    </div>
                    <div className="row">
                        Postal
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" value={props.postal} onChange={ (e) => postal = e.target.value} />
                    </div>
                    <div className="row">
                        Country
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" value={props.country} onChange={ (e) => country = e.target.value} />
                    </div> */}
                    <div className="row" style={{fontSize:"120%", borderStyle:"solid", borderWidth:"1px", borderColor:"#E2E8F0", boxSizing:"border-box", width:"120px"}}>
                    <div className="field">
                    <p className="control">
                        <button onClick={handleEdit}>
                            Edit
                        </button>
                    </p>
                    </div>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </form>
    )
}