import React, {useEffect, useState} from 'react';
import styles from "../feed.module.css";
import {useGetFeedQuery, useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import ImageSlot from "./image-slot";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function FeedOrder({order}) {

    const [photos, setPhotos] = useState([])
    const [sum, setSum] = useState(0)
    const {
        data: ingredients = [],
        isSuccess
    } = useGetIngredientsQuery();


    useEffect(() => {
       if (isSuccess) {
           const filtered = ingredients.filter(item => order.ingredients.includes(item._id));
           const amount = filtered.reduce((a,v) => a + v.price, 0)
           setPhotos(filtered)
           setSum(amount)
       }
    }, [order, ingredients])

    return (
        <div className={styles.card}>
            <div className={styles.horizontal}>
                <p className="text text_type_main-medium">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    The quick brown fox jumps over the lazy dog.
                </p>
            </div>
            <p className="text text_type_main-medium">{order.name}</p>
            <div className={styles.horizontal}>
                <div className={styles.images}>
                    {
                        photos.map((photo, index) => {
                            const isExtra = photos.length > 5;
                            const extras = isExtra ? photos.length - 5 : 0;
                            const extraSlot = index >= 5;
                            return index < 6 && <ImageSlot key={photo._id} image={photo.image} isExtra={extraSlot} extra={extras}/>

                        })
                    }
                </div>
                <div className={styles.priceContainer}><p className="text text_type_digits-medium">{sum}</p> <CurrencyIcon type="primary"/></div>
            </div>
        </div>
    );
}

export default FeedOrder;