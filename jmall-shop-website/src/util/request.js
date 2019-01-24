import axios from "axios";
import {Message} from "element-ui";

const service = axios.create({
    baseURL: process.env.BABEL_ENV,
    timeout: 500000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
});

//  拦截入参

service.interceptors.request.use(config => {
    return config;
}, error => {
    console.log(error);
    Promise.reject(error);
});

//  拦截出参

service.interceptors.response.use(res => {
    return res.data;
}, error => {
    Message({
        type: 'error',
        duration: 5 * 1000,
        message: error.message
    });
    return Promise.reject(error);
});

export default service;
