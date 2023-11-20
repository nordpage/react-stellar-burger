import React, {useEffect, useState} from 'react';
import styles from "./single-feed.module.css"
import {useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import {BUN} from "../../utils/constants";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
function SingleFeedPage({order}) {

    const [sum, setSum] = useState(0)
    const [items, setItems] = useState([])

    const {
        data: ingredients = [],
        isSuccess
    } = useGetIngredientsQuery();

    useEffect(() => {
        if (isSuccess) {
            const filtered = ingredients.filter(item => order.ingredients.includes(item._id));
            const amount = filtered.reduce((a,v) => v.type === BUN ? a + v.price * 2 : a + v.price, 0);
            setItems(filtered)
            setSum(amount)
        }
    }, [order, ingredients])

    const status = () => {
        if (order.status === "done") {
            return <p className={`${styles.created} text text_type_main-small mt-3`}>Выполнен</p>
        } else if (order.status === "pending") {
            return <p className={`${styles.pending} text text_type_main-small mt-3`}>Готовится</p>
        } else {
            return <p className={`${styles.decline} text text_type_main-small mt-3`}>Отменен</p>
        }
    }

    const composition = () => {

    }

    const date = () => {

        const date1 = new Date();
        const date2 = new Date(order.createdAt);
        const diffTime = Math.abs(date1 - date2);
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

    return (
        <div className={styles.container}>
            <p className="text text_type_digits-default">
                #{order.number}
            </p>
            <p className={`${styles.title} text text_type_main-medium mt-10`}>{order.name}</p>
            {status()}
            <p className={`${styles.title} text text_type_main-medium mt-15`}>
                Состав:
            </p>
            <div className={`${styles.ingredients} mt-6`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi aperiam commodi consequatur delectus deleniti dolorum eum ex fuga ipsa labore laboriosam minima molestiae nemo odit officia officiis optio perspiciatis quae, quaerat, quos recusandae rem, reprehenderit sapiente sed similique suscipit vel! Consequuntur, nihil, quis? Excepturi facere molestiae necessitatibus placeat unde?
            </div>
            <div className={`${styles.horizontal} mt-10 mb-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    {date()}
                </p>
                <div className={styles.priceContainer}><p className="text text_type_digits-default">{sum}</p> <CurrencyIcon type="primary"/></div>
            </div>
        </div>
    );
}

export default SingleFeedPage;