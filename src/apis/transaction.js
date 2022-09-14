const API = 'http://localhost:8000/api';

export const listTransactionsByUser = (userId, token, filter) => {
    const { sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/transactions/by/user/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listTransactionsForAdmin = (userId, token, filter) => {
    const { sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/transactions/for/admin/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createTransactionByUser = (userId, token, transaction) => {
    return fetch(`${API}/transaction/create/by/user/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

