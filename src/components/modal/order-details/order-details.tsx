import React from "react";
import Done from "../../../images/done.svg"
import styles from "./order-details.module.css";

type Props = {
    order: number
}

const OrderDetails = function ({order} : Props) {

    return (
        <div className={styles.container}>
            <h1 className="text text_type_digits-large mb-8">{order}</h1>
            <h2 className="text text_type_main-medium mb-15">идентификатор заказа</h2>
            <img src={Done} alt="Done Icon" className="mb-15"/>
            <h2 className="text text_type_main-small mb-2">Ваш заказ начали готовить</h2>
            <h2 className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                станции</h2>
        </div>
    )
}

export default OrderDetails