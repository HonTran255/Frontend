import { refreshTokenApi, getToken } from './auth';
import jwt from "jwt-decode";
const API = 'http://localhost:8000/api';
// const jwt = require('jsonwebtoken');


//user
export const getUser = (userId) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//list user
export const listUserForAdmin = (userId, token, filter) => {
    const { search, sortBy, order, limit, page, role } = filter;

    return fetch(
        `${API}/users/for/admin/${userId}?search=${search}&role=${role}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

// profile
export const getUserProfile = async (userId, token) => {
    //user validate
    const { refreshToken, _id, role } = getToken();
    const decoded = jwt(token);
    const timeout = (decoded.exp - 60) * 1000 - Date.now().valueOf();
    setTimeout(() => refreshTokenApi(refreshToken, _id, role), timeout);

    // getuser
    return fetch(`${API}/user/profile/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateProfile = (userId, token, user) => {
    return fetch(`${API}/user/profile/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//avatar
export const updateAvatar = (userId, token, photo) => {
    return fetch(`${API}/user/avatar/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};


//password
export const updatePassword = (userId, token, user) => {
    return fetch(`${API}/user/password/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//address
export const addAddress = (userId, token, address) => {
    return fetch(`${API}/user/address/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const deleteAddresses = (userId, token, index) => {
    return fetch(`${API}/user/address/${userId}?index=${index}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateAddress = (userId, token, index, address) => {
    return fetch(`${API}/user/address/${userId}?index=${index}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
