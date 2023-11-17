import React from 'react';
import styles from "./orders.module.css";
import FeedOrder from "./feed-order";

function UserOrders({orders}) {
    return (
        <div className={styles.container}>
            <div className={`${styles.orders} custom-scroll`}>
                {
                    orders.map(order => {
                        return <FeedOrder key={order._id} order={order} isUser={true}/>
                    })
                }
            </div>
        </div>
    );
}

export default UserOrders;