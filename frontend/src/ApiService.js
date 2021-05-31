import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    timeout: 120 * 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': ' application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    return response.data;
});

class ApiService {
    static callPost(url, payload, headers, options = {}) {
        return axiosInstance.post(url, payload, {
            headers: {
                ...headers
            },
            ...options
        });
    }

    static callGet(url, params, headers) {
        return axiosInstance.get(url, {
            headers: {
                ...headers
            },
            params: params
        });
    }

    static callPut(url, payload, headers) {
        return axiosInstance.put(url, payload, {
            headers: {
                ...headers
            }
        });
    }

    static callDelete(url, params, headers) {
        return axiosInstance.delete(url, {
            headers: {
                ...headers
            },
            params: params
        });
    }
}

export default ApiService;
