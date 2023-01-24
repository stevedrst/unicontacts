import { IContact, DefaultEmail, DefaultPhone } from './interfaces/contact';
import { environment } from '../environment/env';
import axios from 'axios';
import { ICreateContact } from '../components/createContact';
import { initUserManager } from 'oidc-react';

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
export const getSingleContact = async (id: string): Promise<IContact> => {
  const result = await instance.get(`/biz/contacts/${id}?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress`);
  return result.data;
}
export const getFilteredContacts = async(query: string): Promise<IContact[]> => {
  const result = await instance.get(`/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&filter=contains(Info.Name, '${query}')&top=10`);
  return result.data;
};
// orderby=Info.Name asc / orderby=Info.Name desc
export const getSortedContactsAscended = async(): Promise<IContact[]> => {
  const result = await instance.get(`/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&orderby=Info.Name asc&top=10`);
  return result.data;
}

export const getSortedContactsDescended = async(): Promise<IContact[]> => {
  const result = await instance.get(`/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&orderby=Info.Name desc&top=10`);
  return result.data;
}
export const postContact = async(name: string, addressLine1: string, city: string, country: string, postal: string, phone: string, email: string) : Promise<IContact> => {

  // TODO: Clean up the type. Create one from the response.
  let body: any = {
    Info: {
      Name: name,
      InvoiceAddress: {
          AddressLine1: addressLine1,
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
  const result = await instance.post(`/biz/contacts`, body)
  console.log(result.data);
  return result.data;
}

export const putContact = async(id: number, infoID: number, DefaultEmailID: number, DefaultPhoneID: number, name: string, phone: string, email: string, addressLine1: string) => {
  
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
  console.log(body);
  const result = await instance.put(`/biz/contacts/${id}`, body)
  return result.data;
}

export const deleteContact = async (id: number): Promise<any> => {
  
    const result = await instance.delete(`/biz/contacts/${id}`);
    return result.data;
};

