import React, {useCallback} from 'react';
import styles from "./orders.module.css";
import FeedOrder from "./feed-order";
import {Link, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {feedPropType} from "../../utils/prop-types";

function UserOrders({orders}) {
    const location = useLocation();

    const arrayForSort = [...orders]
    const sorted = useCallback(
        () => {
            if (arrayForSort !== undefined && arrayForSort.length > 0) {
                return arrayForSort.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            }
                },
        [arrayForSort],
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

UserOrders.propTypes = {
    orders: PropTypes.arrayOf(feedPropType).isRequired
};