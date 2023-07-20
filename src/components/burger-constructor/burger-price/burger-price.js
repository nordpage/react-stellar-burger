import React, {useEffect} from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-price.module.css"
function BurgerPrice(props) {
    const [list, setList] = React.useState(props.items)

    useEffect(() => {
        setList(props.items)
    }, [props])

    function fullPrice() {
       return list.reduce((total, currentValue) => total + currentValue.price,0);
    }

    return(
        <section className={`${styles.bottomContainer} mt-10 mr-4`}>
            <div className={styles.priceContainer}><p className="text text_type_digits-medium">{fullPrice()}</p> <CurrencyIcon type="primary"/></div>
            <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
        </section>
    )
}

export default BurgerPrice