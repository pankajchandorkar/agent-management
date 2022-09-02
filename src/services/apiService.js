import { apiUrl } from '../configs/apiConfig';
import axios from 'axios';

export const fetchApi = async (eventName,urlData, token = '') => {
    let res = {};
    let headers = {'Content-Type' : 'application/json'};
    if(token !== ''){
        headers = {...headers, Authorization: `Bearer ${token}`}
    }
    try{
        let url = apiUrl+eventName;
        const response = await axios.post(url,urlData,{
            headers : headers
        });
        if(response.data.responseStatus === 'Ok'){
            res = {status:'Ok', message:'Api Response Successful', data:response.data}
        }else{
            res = {status:'Error', message:'Api Response Failed', data:'', errorMessage:response.data.message}
        }
        return res;
    }catch(err){
        console.log('catch',err);
        return res = {status:'Error', message:'Api Response Failed', data:'', errorMessage:err.message};
    }
};