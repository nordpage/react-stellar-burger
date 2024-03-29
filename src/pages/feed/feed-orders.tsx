import React from 'react';
import FeedOrder from "./feed-order";
import styles from "./orders.module.css"
import {Link, useLocation} from "react-router-dom";
import {useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import {feedSelector} from "../../services/reducers/feedSlice";
import {useAppSelector} from "../../hooks/hooks";

function FeedOrders() {
    const location = useLocation();
    const {orders} = useAppSelector(feedSelector);
    const {
        data
    } = useGetIngredientsQuery(undefined);

    return (
        <div className={styles.container}>
            <p className="text text_type_main-large mb-5">Лента заказов</p>
            <div className={`${styles.orders} custom-scroll`}>
                {
                    orders.map(order => {
                        return <Link
                            key={order._id}
                            to={`/feed/${order._id}/`}
                            // а также сохраняем в свойство background роут,
                            // на котором была открыта наша модалка
                            state={{ background: location }}
                            className={styles.link}
                        ><FeedOrder ingredients={data!.data!} key={order._id} order={order} isUser={false}/></Link>
                    })
                }
            </div>
        </div>
    );
}

export default FeedOrders;