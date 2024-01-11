import styles from "../pages/feed/single-feed.module.css";
import React  from 'react';
import {IOrder} from "./types";

export const BUN = "bun"
export const SAUCE = "sauce"
export const MAIN = "main"

export const API_URL = "https://norma.nomoreparties.space/api"

export const REFRESH = "refresh"
export const ACCESS = "access"
export const CURRENT = "current"
export const FEED = "feed"
export const DETAILS = "Детали ингредиента"

export const date = (order: IOrder) => {

    const date1 : Date = new Date();
    const date2: Date = new Date(order.createdAt);
    const diffTime = Math.abs(date1.getDate() - date2.getDate());
    let minutes = Math.floor(diffTime / 60000);
    let hours = Math.round(minutes / 60);
    let diffDays = Math.round(hours / 24);
    let day;

    if (diffDays === 0) {
        day = "Сегодня"
    } else if (diffDays === 1) {
        day = "Вчера"
    } else {
        day = `${diffDays} дня назад`
    }

    const time = date2.toTimeString().split(" (")[0];

    return `${day}, ${time}`;
}

export const status = (order: IOrder) => {
    if (order.status === "done") {
        return <p className={`${styles.created} text text_type_main-small mt-3`}>Выполнен</p>
    } else if (order.status === "pending") {
        return <p className={`${styles.pending} text text_type_main-small mt-3`}>Готовится</p>
    } else {
        return <p className={`${styles.decline} text text_type_main-small mt-3`}>Отменен</p>
    }
}