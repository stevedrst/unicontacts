import React from 'react';

interface IContactProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    clickHandler: (e:  React.MouseEvent<HTMLButtonElement>) => void;
}
// TODO: Add CSS files.
export const ContactDetail: React.FunctionComponent<IContactProps> = (props) => {

    return(
        <div>
            <div className="columns" style={{float: "left", fontSize:"60%", margin:"8px"}} >
                <div className="column" >
                    <div className="row">
                        Name
                    </div>
                    <div className="row" style={{fontSize:"120%", borderStyle:"solid", borderWidth:"1px", borderColor:"#E2E8F0", boxSizing:"border-box", width:"120px"}}>
                        {props.name}
                    </div>
                    <div className="row">
                        Email
                    </div>
                    <div className="row" style={{fontSize:"120%", borderStyle:"solid", borderWidth:"1px", borderColor:"#E2E8F0", boxSizing:"border-box", width:"120px"}}>
                        {props.email}
                    </div>
                    <div className="row">
                        Phone
                    </div>
                    <div className="row" style={{fontSize:"120%", borderStyle:"solid", borderWidth:"1px", borderColor:"#E2E8F0", boxSizing:"border-box", width:"120px"}}>
                        {props.phone}
                    </div>
                    <div className="row" style={{fontSize:"120%", borderStyle:"solid", borderWidth:"1px", borderColor:"#E2E8F0", boxSizing:"border-box", width:"120px"}}>
                         <button onClick={props.clickHandler}> Open</button>
                    </div>
                </div>
            </div>
        </div>
    )
}