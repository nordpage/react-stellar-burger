import React from 'react';
import styles from "./orders.module.css";
import FeedOrder from "./feed-order";
import {Link, useLocation} from "react-router-dom";

function UserOrders({orders}) {
    const location = useLocation();

    return (
        <div className={styles.container}>
            <div className={`${styles.orders} custom-scroll`}>
                {
                    orders.map(order => {
                        return <Link
                            key={order._id}
                            to={`/profile/orders/${order._id}`}
                            // а также сохраняем в свойство background роут,
                            // на котором была открыта наша модалка
                            state={{ background: location }}
                            className={styles.link}
                        ><FeedOrder key={order._id} order={order} isUser={true}/></Link>
                    })
                }
            </div>
        </div>
    );
}

export default UserOrders;