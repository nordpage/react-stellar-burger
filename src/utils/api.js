import {API_URL} from "./constants";

export const fetchIngredients = () => {
    return fetch(API_URL)
        .then(getResponseData)
}


function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}