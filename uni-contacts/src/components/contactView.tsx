import { useOidcAccessToken } from '@axa-fr/react-oidc';
import React, { FormEvent, useState } from 'react';
import { deleteContact, putContact } from '../api/requests';
import Dialog from '../components/confirmDialog';

interface IContactViewProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    addressline1: string;
    infoID: number;
    defaultEmailID: number;
    defaultPhoneID: number;
    city: string;
    postal: string;
    country: string;
}

// TODO: Add CSS files.
export const ContactView: React.FunctionComponent<IContactViewProps> = (props) => {
    const [cname, setCname] = useState(props.name);
    const [cphone, setCphone] = useState(props.phone);
    const [cemail, setCemail] = useState(props.email);
    const [caddressline1, setCAddressLine1] = useState(props.addressline1);
    let ccity: string = props.city;
    let cpostal: string = props.postal;
    let ccountry: string = props.country;
    const [actionID, setActionID] = useState(0);
    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
      });

    const { accessToken} = useOidcAccessToken();

    const handleEdit = async (e: FormEvent) => {
        e.preventDefault();
        setActionID(1);
        handleDialog("Are you sure you want to edit?", true);
        
    }
    const handleDelete = async(e: FormEvent) => {
        e.preventDefault();
        setActionID(2);
        handleDialog("Are you sure you want to delete?", true);
    }
    const handleDialog = (message: any, isLoading: any) => {
        setDialog({
          message,
          isLoading,
        });
      };
      const areUSureDelete = async (choose: any) => {
        console.log(actionID);
        if (choose) {
            if(actionID === 1) {
                let result = await putContact(props.id, props.infoID, props.defaultEmailID, props.defaultPhoneID, cname, cphone, cemail, caddressline1);
            } else {
                let result = await deleteContact(props.id);
            }
                handleDialog("", false);
            } else {
                handleDialog("", false);
            }
          
      };

    return(
        <div>
        <form>
            <div className="columns" style={{fontSize:"60%", margin:"8px", display:"flex"}} >
                <div className="column" style={{marginRight:"8px", float:"left"}}>
                    <div className="row">
                        Name
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder={props.name} onChange={ (e) => setCname(e.target.value)} />
                    </div>
                    <div className="row">
                        Email
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder={props.email} onChange={ (e) => setCemail(e.target.value)} />
                    </div>
                    <div className="row">
                        Phone
                    </div>
                    <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder={props.phone} onChange={ (e) => setCphone(e.target.value)} />
                    </div>
                    <div className="row" style={{marginTop: "40px"}}>
                        <div className="field">
                        <p className="control">
                            <button onClick={handleEdit} style={{float: "left", background:"#339DFF", borderRadius:"50px", width:"80px", color:"#fff"}}>
                                Edit
                            </button>
                        </p>
                        <p className="control">
                            <button onClick={handleDelete} style={{float: 'right', background:"#f44336", borderRadius:"50px", width:"80px", color:"#fff"}}>Delete</button>
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="column" style={{width:"8rem", float:"right"}}>
                        <div className="row">
                            Addressline 1
                        </div>
                        <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder={props.addressline1} onChange={ (e) => setCAddressLine1(e.target.value)} />
                        </div>
                        <div className="row">
                            City
                        </div>
                        <div className="row">
                        <input style={{width:"240px"}}  className="input" type="title" placeholder={props.city} onChange={ (e) => ccity = e.target.value} />
                        </div>
                        <div className="row">
                            Postal
                        </div>
                        <div className="row">
                            <input style={{width:"240px"}}  className="input" type="title" placeholder={props.postal} onChange={ (e) => cpostal = e.target.value} />
                        </div>
                        <div className="row">
                            Country
                        </div>
                        <div className="row">
                            <input style={{width:"240px"}}  className="input" type="title" placeholder={props.country} onChange={ (e) => ccountry = e.target.value} />
                        </div>
                    </div>
                </div>
        </form>
        {dialog.isLoading && (
            <Dialog
            //Update
            onDialog={areUSureDelete}
            message={dialog.message}
            />
        )}
        </div>
    )
}