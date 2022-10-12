const API = 'http://localhost:8000/api';

export const geyProducerById = (producerId) => {
    return fetch(`${API}/producer/by/id/${producerId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listActiveProducers = (filter) => {
    const { search, sortBy, order, limit, page, producerId } = filter;
    return fetch(
        `${API}/active/producers?search=${search}&producerId=${producerId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listProducers = (userId, token, filter) => {
    const { search, sortBy, order, limit, page, producerId } = filter;
    return fetch(
        `${API}/producers/${userId}?search=${search}&producerId=${producerId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createProducer = (userId, token, producer) => {
    return fetch(`${API}/producer/create/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: producer,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateProducer = (userId, token, producerId, producer) => {
    return fetch(`${API}/producer/${producerId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: producer,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const deleteProducer = (userId, token, producerId) => {
    return fetch(`${API}/producer/${producerId}/${userId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

