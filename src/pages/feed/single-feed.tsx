import React, {useCallback, useEffect, useState} from 'react';
import styles from "./single-feed.module.css"
import {useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import {BUN, date, status} from "../../utils/constants";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient, IOrder} from "../../utils/types";

type Props = {
    order: IOrder
}
function SingleFeedPage({order} : Props) {

    const [sum, setSum] = useState(0)
    const [items, setItems] = useState<Ingredient[]>([])

    const { data: ingredients, isSuccess } = useGetIngredientsQuery(undefined);

    useEffect(() => {
        if (isSuccess) {
            const filtered = ingredients.data!.filter(item => order.ingredients.includes(item._id));
            const amount = filtered.reduce((a,v) => v.type === BUN ? a + v.price * 2 : a + v.price, 0);
            setItems(filtered)
            setSum(amount)
        }
    }, [order, ingredients])

    const composition = useCallback((ingredients: Ingredient[]) => {
        const uniqueIngredients = Array.from(new Set(ingredients));
        return <div className={`${styles.ingredients} custom-scroll mt-6`}>
            {
                uniqueIngredients.map(value => {
                    const count = value.type === BUN ? 2 : ingredients.filter(x => x._id === value._id).length;
                    return <div key={value._id} className={styles.feed}>
                        <img className={styles.image} alt={value.name} src={value.image}/>
                        <div className={styles.titleContainer}>
                            <p className="text text_type_main-medium">
                                {value.name}
                            </p>
                        </div>
                        <div className={styles.priceContainer}><p className="text text_type_digits-default">{count} x {value.price}</p> <CurrencyIcon type="primary"/></div>
                    </div>
                })
            }
        </div>;
    },[items]);


    return (
        <div className={styles.container}>
            <p className="text text_type_digits-default">
                #{order.number}
            </p>
            <p className={`${styles.header} text text_type_main-medium mt-10`}>{order.name}</p>
            {status(order)}
            <p className={`${styles.header} text text_type_main-medium mt-15`}>
                Состав:
            </p>
            {
                composition(items)
            }
            <div className={`${styles.horizontal} mt-10 mb-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    {date(order)}
                </p>
                <div className={styles.priceContainer}><p className="text text_type_digits-default">{sum}</p> <CurrencyIcon type="primary"/></div>
            </div>
        </div>
    );
}

export default SingleFeedPage;
