import React, {useEffect, useState} from 'react';
import styles from "./feed.module.css";
import {useGetFeedQuery, useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import ImageSlot from "./image-slot";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import moment from "moment";
import {BUN} from "../../utils/constants";

function FeedOrder({order, isUser = false}) {

    const [photos, setPhotos] = useState([])
    const [sum, setSum] = useState(0)
    const moment = require('moment');

    let _index = 6;
    const {
        data: ingredients = [],
        isSuccess
    } = useGetIngredientsQuery();


    useEffect(() => {
       if (isSuccess) {
           const filtered = ingredients.filter(item => order.ingredients.includes(item._id));
           const amount = filtered.reduce((a,v) => v.type === BUN ? a + v.price * 2 : a + v.price, 0)
           setPhotos(filtered)
           setSum(amount)
       }
    }, [order, ingredients])

    const date = () => {

        let dateOne = moment(order.createdAt);
        let dateTwo = moment(Date());
        let day;
        let days = dateOne.diff(dateTwo, 'days');
        if (days === 0) {
            day = "Сегодня"
        } else if (days === 1) {
            day = "Вчера"
        } else {
            day = `${days} дня назад`
        }

        const time = dateOne.format('H:mm')

        return `${day}, ${time} i-GMT+3`;
    }

    return (
        <div className={styles.card}>
            <div className={styles.horizontal}>
                <p className="text text_type_main-medium">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {date()}
                </p>
            </div>
            <p className="text text_type_main-medium">{order.name}</p>
            {isUser && <p className="text text_type_main-medium">{order.status}</p>}
            <div className={styles.horizontal}>
                <div className={styles.images}>
                    {
                        photos
                            .map((photo, index) => {
                            const isExtra = photos.length > 5;
                            const amount = isExtra ? photos.length - 5 : 0;
                            _index -= 1;
                            return index < 6 && <ImageSlot key={photo._id} image={photo.image} index={_index} amount={amount}/>

                        })
                    }
                </div>
                <div className={styles.priceContainer}><p className="text text_type_digits-default">{sum}</p> <CurrencyIcon type="primary"/></div>
            </div>
        </div>
    );
}

export default FeedOrder;