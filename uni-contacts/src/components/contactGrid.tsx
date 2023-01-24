import React from 'react';

interface IContactProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    city: string;
    postal: string;
    country: string;
    clickHandler: (e:  React.MouseEvent<HTMLTableRowElement>) => void;
}
// TODO: Add CSS files.
export const ContactGrid: React.FunctionComponent<IContactProps> = (props) => {

    return(
            <tr onClick={props.clickHandler}>
                
                    <td >
                        {props.name}
                    </td>
                    <td >
                        {props.email}
                    </td>
                    <td >
                        {props.phone}
                    </td>
                    <td >
                        {props.addressLine1}
                    </td>
                    <td >
                        {props.city}
                    </td>
                    <td >
                        {props.postal}
                    </td>
                    <td >
                        {props.country}
                    </td>
                </tr>
    )
}