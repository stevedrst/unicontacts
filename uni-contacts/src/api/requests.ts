import { environment } from '../environment/env';
import axios from 'axios';

const BASE_URL = environment.base_url;;

export const getContacts = async (token: string): Promise<any> => {
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