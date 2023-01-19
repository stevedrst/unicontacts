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

// TODO: Add CSS files.

export const CreateContact: React.FunctionComponent<ICreateContactProps> = (props) => {
    
    const { state, onChange } = useOnChange<ICreateContact>(defaultContact);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { result, error } = await safe<any>(postContact(state, ));

        if (!result || error) {
            console.error("Something went wrong attempting to create a contact");
            return;
        }

        props.contactCreated(result);
    }

    const inputProperties = (key: keyof ICreateContact) => {
        switch (key) {
            case 'email':
                return { type: "email", title: "Email", placeholder: "Email" }
            case 'phone':
                return { type: "tel", title: "tel", placeholder: "tel" }
            case 'addressLine1':
                return { type: "text", title: "Address", placeholder: "Address" }
            case 'city':
                return { type: "text", title: "City", placeholder: "City" }
            case 'postal':
                return { type: "text", title: "Postal", placeholder: "Postal" }
            case 'name':
                return { type: "text", title: "Name", placeholder: "Name" }
            case 'country':
                return { type: "text", title: "Country", placeholder: "Country" }
            default:
                return { type: "text", title: "Unknown", placeholder: "Unknown" }
        }
    };

    /**
     * Generate all form fields for the create contact form.
     */
    const createFormFields = () => {
        if (!state) return;

        return Object.keys(state).map( key => {
        
            const properties = inputProperties(key as keyof ICreateContact);
    
            return (
                <div className="column" key={key}>
                    <div className="row" style={{width:"240px"}}>
                        {properties?.title}
                    </div>
                    <div className="row">
                        <p className="control has-icons-left has-icons-right">
                            <input style={{width:"240px"}} value={state[key as keyof ICreateContact]} className="input" type={properties?.type} placeholder={properties?.placeholder} onChange={ (e) => onChange(key, e.target.value)} />
                        </p>
                    </div>
                </div>
            );
        });
    }

    return(
        <div>
            <div style={{fontSize:"55%", margin:"32px"}}>
                <form id="create-form" className="field" onSubmit={handleSubmit}>
                    <div className ="columns">
                        {createFormFields()}
                    </div>
                    <div className="field">
                    <p className="control">
                        <button className="button is-success">
                            Create
                        </button>
                    </p>
                </div>
                </form>
            </div>
        </div>
    )
}
