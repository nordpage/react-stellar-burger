import React from 'react';
import FeedOrder from "./feed-order";
import styles from "./orders.module.css"

function FeedOrders({orders}) {

    return (
        <div className={styles.container}>
            <p className="text text_type_main-large">Лента заказов</p>
            <div className={`${styles.orders} custom-scroll`}>
                {
                    orders.map(order => {
                        return <FeedOrder key={order._id} order={order}/>
                    })
                }
            </div>
        </div>
    );
}

export default FeedOrders;