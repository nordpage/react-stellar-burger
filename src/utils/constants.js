export const BUN = "bun"
export const SAUCE = "sauce"
export const MAIN = "main"

export const API_URL = "https://norma.nomoreparties.space/api"

export const postOptions = form => {
   return  {
        method: 'POST',
            mode: 'cors',
        cache: "no-cache",
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
    },
        redirect: 'follow',
            referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    }
}