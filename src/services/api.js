import {postOptions} from "../utils/constants";

export const registerRequest = async form => {
    return await fetch('https://norma.nomoreparties.space/api/auth/register', postOptions(form))
}

export const loginRequest = async form => {
    return await fetch('https://norma.nomoreparties.space/api/auth/login',postOptions(form))
}

export const logoutRequest = async form => {
    return await fetch('https://norma.nomoreparties.space/api/auth/logout', postOptions(form))
}