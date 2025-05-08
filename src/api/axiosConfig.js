import axios from 'axios';
import {properties} from "../../properties.js";

const api = axios.create({
    baseURL: properties.baseURL
});

api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            return Promise.reject({
                message: 'Network error',
                statusCode: 'NETWORK_ERROR'
            });
        }
        switch (error.response.status) {
            case 400:
                return Promise.reject({
                    message: 'Bad Request',
                    statusCode: 400,
                    data: error.response.data
                });
            case 401:
                return Promise.reject({
                    message: 'Unauthorized',
                    statusCode: 401
                });
            case 403:
                return Promise.reject({
                    message: 'Forbidden',
                    statusCode: 403
                });
            case 404:
                return Promise.reject({
                    message: 'Not Found',
                    statusCode: 404
                });
            case 500:
                return Promise.reject({
                    message: 'Server Error',
                    statusCode: 500,
                    data: error.response.data
                });
            default:
                return Promise.reject({
                    message: 'Something went wrong',
                    statusCode: error.response.status,
                    data: error.response.data
                });
        }
    }
);

export default api;
