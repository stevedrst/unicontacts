import { useOidcAccessToken } from '@axa-fr/react-oidc';
import React, { FormEvent, useState, useEffect } from 'react';
import { postContact } from '../api/requests';


interface ICreateContactProps {}

let name: string = "";
let phone: string = "";
let email: string = "";
let addressline1 = "";
let city = "";
let country = "";
let postal = "";

// TODO: Add CSS files.

export const CreateContact: React.FunctionComponent<ICreateContactProps> = (props) => {
    const { accessToken} = useOidcAccessToken();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await postContact(name, phone, email, addressline1, city, postal, country, accessToken);
    }

    return(<div>
        <div style={{fontSize:"55%", margin:"32px"}}>
            <form id="create-form" className="field" onSubmit={handleSubmit}>
            <div className ="columns">
                    <div className="column">
                        <div className="row" style={{width:"240px"}}>
                            Name
                        </div>
                        <div className="row">
                            <p className="control has-icons-left has-icons-right">
                                <input style={{width:"240px"}}  className="input" type="title" placeholder="Name" onChange={ (e) => name = e.target.value} />
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row" style={{width:"240px"}}>
                            Phone
                        </div>
                        <div className="row">
                            <p className="control has-icons-left has-icons-right">
                                <input style={{width:"240px"}} className="input" type="text" placeholder="Phone" onChange={ (e) => phone = e.target.value} />
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row" style={{width:"240px"}}>
                            Email
                        </div>
                        <div className="row">
                            <p className="control has-icons-left has-icons-right">
                                <input style={{width:"240px"}}  className="input" type="title" placeholder="Email" onChange={ (e) => email = e.target.value} />
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row" style={{width:"240px"}}>
                            Addressline1
                        </div>
                        <div className="row">
                            <p className="control has-icons-left has-icons-right">
                                <input style={{width:"240px"}}  className="input" type="title" placeholder="Addressline1" onChange={ (e) => addressline1 = e.target.value} />
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row" style={{width:"240px"}}>
                            City
                        </div>
                        <div className="row">
                            <p className="control has-icons-left has-icons-right">
                                <input style={{width:"240px"}}  className="input" type="title" placeholder="City" onChange={ (e) => city = e.target.value} />
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row" style={{width:"240px"}}>
                            Postal
                        </div>
                        <div className="row">
                            <p className="control has-icons-left has-icons-right">
                                <input style={{width:"240px"}}  className="input" type="title" placeholder="Postal" onChange={ (e) => postal = e.target.value} />
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row" style={{width:"240px"}}>
                            Country
                        </div>
                        <div className="row">
                            <p className="control has-icons-left has-icons-right">
                                <input style={{width:"240px"}}  className="input" type="title" placeholder="Country" onChange={ (e) => country = e.target.value} />
                            </p>
                        </div>
                    </div>
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
    </div>)
}