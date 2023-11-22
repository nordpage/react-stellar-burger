import React, {useEffect, useState} from 'react';
import styles from "./feed.module.css";
import {useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import ImageSlot from "./image-slot";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {BUN, date, FEED, status} from "../../utils/constants";
import {useDispatch} from "react-redux";
import {openModal} from "../../services/reducers/modalSlice";
import {modalTypes} from "../../utils/modal-types";

function FeedOrder({order, isUser = false}) {

    const [photos, setPhotos] = useState([])
    const [sum, setSum] = useState(0)
    const dispatch = useDispatch()

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

    function onItemClick(order) {
        localStorage.setItem(FEED, order._id)
        dispatch(openModal(modalTypes.Feed))
    }

    return (
        <div className={styles.card} onClick={() => onItemClick(order)}>
            <div className={`${styles.horizontal} mb-6`}>
                <p className="text text_type_main-medium">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {date(order)}
                </p>
            </div>
            <p className={`${styles.title} text text_type_main-medium`}>{order.name}</p>
            {isUser && status(order)}
            <div className={`${styles.horizontal} mt-6`}>
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