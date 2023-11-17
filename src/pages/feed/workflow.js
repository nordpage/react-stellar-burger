import React from 'react';
import styles from "./orders.module.css"

function Workflow({feed}) {

    const readyList = () => {
        return feed.orders.filter(x => x.status === "done").slice(0, 20);
    }

    const workList = () => {
        return feed.orders.filter(x => x.status !== "done").slice(0, 20);
    }

    return (
        <div className={styles.workflow}>
            <div className={styles.boards}>
                <div className={styles.board}>
                    <p className="text text_type_main-medium">
                        Готовы:
                    </p>
                    <div className={styles.readyList}>
                        {
                            readyList().map(item => {
                                return <p className={`${styles.readyTitle} text text_type_digits-medium`}>
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
                            workList().map(item => {
                                return <p className="text text_type_digits-medium">
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
                <p className="text text_type_digits-large">{feed.total}</p>
            </div>
            <div className={styles.total}>
                <p className="text text_type_main-medium">
                    Выполнено за сегодня:
                </p>
                <p className="text text_type_digits-large">{feed.totalToday}</p>
            </div>
        </div>
    );
}

export default Workflow;