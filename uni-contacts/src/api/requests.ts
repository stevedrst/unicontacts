import { IContact, DefaultEmail, DefaultPhone } from './interfaces/contact';
import { environment } from '../environment/env';
import axios from 'axios';
import { ICreateContact } from '../components/createContact';

const BASE_URL = environment.base_url;

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
   headers: {
    'Access-Control-Allow-Origin': '*',
  }
});

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // @ts-ignore
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export const getContacts = async (): Promise<IContact[]> => {
    const result = await instance.get(`/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&top=10`);
    return result.data;
};

export const postContact = async(contact: ICreateContact) : Promise<IContact> => {

  // TODO: Clean up the type. Create one from the response.
  let body: any = {
    Info: {
      Name: contact.name,
      InvoiceAddress: {
          AddressLine1: contact.addressLine1,
          AddressLine2: "1 etg.",
          AddressLine3: "",
          City: contact.city,
          Country: contact.country,
          CountryCode: "DW",
          PostalCode: contact.postal,
        },
      DefaultPhone: {
          CountryCode: "+999",
          Description: "Mobile",
          Number: contact.phone,
        },
      DefaultEmail: {
          EmailAddress: contact.email,
        }
    },
    Comment: "Stevens new wonderful contact!"
  }
  const result = await instance.post(`/biz/contacts`, body)
  console.log(result.data);
  return result.data;
}

export const putContact = async(id: number, infoID: number, DefaultEmailID: number, DefaultPhoneID: number, name: string, phone: string, email: string, addressLine1: string, token: string) => {
  
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
  const result = await instance.put(`/biz/contacts/${id}`, body)
  return result.data;
}

export const deleteContact = async (id: number, token: string): Promise<any> => {
  
    const result = await instance.delete(`/biz/contacts/${id}`);
    return result.data;
};

