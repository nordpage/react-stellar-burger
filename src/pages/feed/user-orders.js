import React, {useCallback} from 'react';
import styles from "./orders.module.css";
import FeedOrder from "./feed-order";
import {Link, useLocation} from "react-router-dom";

function UserOrders({orders}) {
    const location = useLocation();

    const sorted = useCallback(
        () => {
            if (orders !== undefined && orders.length > 0) {
                return orders.sort(function(a,b){
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(b.createAt) - new Date(a.createAt);
                    })
            }
                },
        [orders],
    );


    return (
        <div className={styles.container}>
            <div className={`${styles.orders} custom-scroll`}>
                {
                    sorted().map(order => {
                        return <Link
                            key={order._id}
                            to={`/profile/orders/${order._id}`}
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