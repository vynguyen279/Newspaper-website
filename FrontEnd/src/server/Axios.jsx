import axios from 'axios';
import {Hypnosis} from 'react-cssfx-loading';
import React, {useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from 'react-router-dom';
import { Toast } from 'react-toastify/dist/components';

var displayLoading, setDisplayLoading;
function AxiosLoading() {
    const [isLoading, setIsLoading] = useState(false);
    setDisplayLoading = setIsLoading;
    displayLoading = isLoading;
    return (
        <>
            {displayLoading && (
                <div className='loading-overlay'>
                    <Hypnosis color='var(--gold)' width='35px' height='35px' />
                </div>
            )}
        </>
    );
}

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: "http://192.168.1.23:3000",
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',

    },
});

instance.interceptors.request.use(
    function (config) {
        console.log('Call API: ' + config.url);
        // setDisplayLoading(true);
        config.headers.Authorization = localStorage.Authorization;
        return config;
    },
    function (error) {
        // Do something with request error
        // setDisplayLoading(false);
        return toast.error(error.message);
    },
);
instance.interceptors.response.use(
    async function (response) {
        // setTimeout(() => setDisplayLoading(false), 500);
        // console.log(response.headers.get('Authorization'));
        // if (response.headers.get('Authorization')) {
        //     response.data = {
        //         ...response.data,
        //         Authorization: response.headers.get('Authorization'),
        //     };
        // }

        //toast message
        if (response.config.method != 'get')
            if (response.data.status) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        //token hết hạn thì rediect về trang đăng nhập
        // if (response.data.message && response.data.message.includes('Token')) {
        //     window.location.href = '/sign-in';
        // }
        return response;
    },
    function (error) {
        // setDisplayLoading(false);
        return toast.error(error.message);
    },
);

export {instance as axios, AxiosLoading, setDisplayLoading};
