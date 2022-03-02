import axios from 'axios';
import { Log, LogError } from '../logger/Logger'

const client =  axios.create({
    baseURL: "http://localhost:8080/api/mimock/v1"
});


const get = async (url, token) => {
    try {
        const response = await client.get(url, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        });
        Log(url, response);
        return response;
    } catch(err){
        LogError(err);
    }
    return null;
}

const post = async (url, requestData, token, contentType) => {
    try {
        const response = await client.post(url, requestData, {
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': contentType
            }
        });
        Log(url, response);
        return response;
    } catch(err){
        LogError(err);
    }
    return null;
}


const put = async (url, data, token, contentType) => {
    try {
        const response = await client.put(url, data, {
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': contentType
            }
        });
        Log(url, response);
        return response;
    } catch(err){
        LogError(err);
    }
    return null;
}

const remove = async (url, token) => {
    try {
        const response = await client.delete(url, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        });
        Log(url, response);
        return response;
    } catch(err){
        LogError(err);
    }
    return null;
}

const options = async (url, token) => {
    try {
        const response = await client.options(url, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        });
        Log(url, response);
        return response;
    } catch(err){
        LogError(err);
    }
    return null;
}

export {get, post, put, remove, options};