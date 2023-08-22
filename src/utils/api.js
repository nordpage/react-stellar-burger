import {API_URL} from "./constants";

export const fetchIngredients = () => {
    return fetch(`${API_URL}ingredients`)
        .then(getResponseData)
}


export const fetchOrder = (body) => {
    const params = {
        ingredients: body
    }

    return fetch(`${API_URL}orders`,{
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        method: "post",
        body: JSON.stringify(params)
    }).then(getResponseData)
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}