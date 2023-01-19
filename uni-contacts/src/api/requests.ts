import { IContact, DefaultEmail, DefaultPhone } from './interfaces/contact';
import { environment } from '../environment/env';
import axios from 'axios';

const BASE_URL = environment.base_url;;

export const getContacts = async (token: string): Promise<IContact[]> => {
  const reqInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 5000,
     headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
    }
  });

    const result = await reqInstance.get(`/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&top=10`);
    console.log(result.data);
    return result.data;
};

export const postContact = async(name: string, phone: string, email: string, addressline1: string, city: string, postal: string, country: string, token: string) : Promise<IContact> => {
  const reqInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 5000,
     headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
    }
  });
  // TODO: Clean up the type
  let body: any = {
    Info: {
      Name: name,
      InvoiceAddress: {
          AddressLine1: addressline1,
          AddressLine2: "1 etg.",
          AddressLine3: "",
          City: city,
          Country: country,
          CountryCode: "DW",
          PostalCode: postal,
        },
      DefaultPhone: {
          CountryCode: "+999",
          Description: "Mobile",
          Number: phone,
        },
      DefaultEmail: {
          EmailAddress: email,
        }
    },
    Comment: "Stevens new wonderful contact!"
  }
  const result = await reqInstance.post(`/biz/contacts`, body)
  console.log(result.data);
  return result.data;
}

export const putContact = async(id: number, infoID: number, DefaultEmailID: number, DefaultPhoneID: number, name: string, phone: string, email: string, addressline1: string, token: string) => {
 console.log(token);
  const reqInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 5000,
     headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
    }
  });
  // TODO: Clean up the type
  let body: any = {
    ID: id,
    Info: {
      ID: infoID,
      Name: name,
      DefaultEmail: {
        ID: DefaultEmailID,
        EmailAddress: email
     },
     DefaultPhone: {
      ID: DefaultPhoneID,
      Number: phone
     }
    },
    
  }
  const result = await reqInstance.put(`/biz/contacts/${id}`, body)
  console.log(result.data);
  return result.data;
}

export const deleteContact = async (id: number, token: string): Promise<any> => {
  const reqInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 5000,
     headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
    }
  });

    const result = await reqInstance.delete(`/biz/contacts/${id}`);
    console.log(result.data);
    return result.data;
};

