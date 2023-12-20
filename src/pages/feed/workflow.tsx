import React from 'react';
import styles from "./orders.module.css"
import {useSelector} from "react-redux";
import {TStore} from "../../services/reducers/store";

function Workflow() {
    const {orders, total, totalToday} = useSelector((store: TStore) => store.feed);

    const readyList = () => {
        return orders.filter(x => x.status === "done").slice(0, 20);
    }

    const workList = () => {
        return orders.filter(x => x.status === "pending").slice(0, 20);
    }

    return (orders.length > 0 && total !== 0 && totalToday !== 0) && (
        <div className={styles.workflow}>
            <div className={styles.boards}>
                <div className={styles.board}>
                    <p className="text text_type_main-medium">
                        Готовы:
                    </p>
                    <div className={styles.readyList}>
                        {
                            readyList().map((item, index) => {
                                return <p key={index} className={`${styles.readyTitle} text text_type_digits-medium`}>
                                    {item.number}
                                </p>
                            })
                        }
                    </div>
                </div>
                <div className={styles.board}>
                    <p className="text text_type_main-medium">
                        В работе:
                    </p>
                    <div className={styles.readyList}>
                        {
                            workList().map((item, index) => {
                                return <p key={index} className="text text_type_digits-medium">
                                    {item.number}
                                </p>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.total}>
                <p className="text text_type_main-medium">
                    Выполнено за все время:
                </p>
                <p className="text text_type_digits-large">{total}</p>
            </div>
            <div className={styles.total}>
                <p className="text text_type_main-medium">
                    Выполнено за сегодня:
                </p>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </div>
    );
}

export default Workflow;