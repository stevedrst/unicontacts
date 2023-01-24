import { useOidcAccessToken } from '@axa-fr/react-oidc';
import React, { FormEvent, useState, useEffect } from 'react';
import { IContact } from '../api/interfaces/contact';
import { postContact } from '../api/requests';
import { useOnChange } from '../Hooks/onChange';
import { safe } from '../utils/safe';


interface ICreateContactProps {
    contactCreated: (newContact: ICreateContact) => void;
}

export interface ICreateContact {
    name: string;
    phone: string;
    email: string;
    addressLine1: string;
    city: string;
    country: string;
    postal: string;
}

const defaultContact: ICreateContact = {
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    city: "",
    country: "",
    postal: "",
}

let name: string = "";
let phone: string = "";
let email: string = "";
let addressLine1: string = "";
let city: string = "";
let country: string = "";
let postal: string = "";

// TODO: Add CSS files.

export const CreateContact: React.FunctionComponent<ICreateContactProps> = (props) => {
    
    const { state, onChange } = useOnChange<ICreateContact>(defaultContact);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { result, error } = await safe<any>(postContact(name, addressLine1, city, country, postal, phone, email));

        if (!result || error) {
            console.error("Something went wrong attempting to create a contact");
            return;
        }

        props.contactCreated(result);
    }

    return(
        <div>
            <div style={{margin:"32px"}}>
                <h1>Create contact</h1>
                <form id="create-form" className="field" onSubmit={handleSubmit}>
            <div className="columns" style={{margin:"8px", display:"flex"}} >
                <div className="column" style={{marginRight:"8px", float:"left"}}>
                    <div className="row">
                        Name
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder="Name" onChange={ (e) => name = e.target.value} />
                    </div>
                    <div className="row">
                        Email
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder="Email" onChange={ (e) => email = e.target.value} />
                    </div>
                    <div className="row">
                        Phone
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder="Phone" onChange={ (e) => phone = e.target.value} />
                    </div>
                    <div className="row" style={{marginTop: "40px", }}>
                    <button className="button is-success" style={{background:"#339DFF", borderRadius:"50px", width:"80px", color:"#fff"}}>
                            Create
                    </button>
                    </div>
                    </div>
                    <div className="column" style={{width:"8rem", float:"right"}}>
                        <div className="row">
                            Addressline 1
                        </div>
                        <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder="Addressline 1" onChange={ (e) => addressLine1 = e.target.value} />
                        </div>
                        <div className="row">
                            City
                        </div>
                        <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder="City" onChange={ (e) => city = e.target.value} />
                        </div>
                        <div className="row">
                            Postal
                        </div>
                        <div className="row">
                            <input style={{width:"240px"}}  className="input" type="title" placeholder="Postal" onChange={ (e) => postal = e.target.value} />
                        </div>
                        <div className="row">
                            Country
                        </div>
                        <div className="row">
                            <input style={{width:"240px"}}  className="input" type="title" placeholder="Country" onChange={ (e) => country = e.target.value} />
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}
