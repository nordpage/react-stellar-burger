import React, {useState} from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-price.module.css"
import {useDispatch, useSelector} from "react-redux";
import {usePostOrderMutation} from "../../../services/reducers/burgerApi";
import {addOrderNumber} from "../../../services/reducers/orderSlice";
import {openModal} from "../../../services/reducers/modalSlice";
import {modalTypes} from "../../../utils/modal-types";
import {FadeLoader} from "react-spinners";
import {useNavigate} from "react-router-dom";
import {selectCurrentToken} from "../../../services/reducers/authSlice";

const BurgerPrice = function() {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const {cart} = useSelector((store) => store.burger)
    const [postOrder] = usePostOrderMutation()
    const navigate = useNavigate();
    const accessToken = useSelector(selectCurrentToken)


   async function postOrderRequest(burger) {
        if (accessToken) {
            setLoading(true)
            if (!burger.bun || !burger.ingredients) return;
            const orderIds = [burger.bun, burger.ingredients, burger.bun].flat().map(item => item._id)
            const response = await postOrder(orderIds).unwrap();
            try {
                dispatch(addOrderNumber(response.order.number))
                dispatch(openModal(modalTypes.Order))
                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        } else {
            navigate("/login")
        }
   }

    return(
        <section className={`${styles.bottomContainer} mr-4`}>
        {
                (loading) ?
                    <div className={styles.loader}>
                        <FadeLoader color="#8585AD" />
                    </div> :
                    <>
                            <div className={styles.priceContainer}><p className="text text_type_digits-medium">{cart.sum}</p> <CurrencyIcon type="primary"/></div>
                            <Button htmlType="button" type="primary" size="large" onClick={() => postOrderRequest(cart)}>Оформить заказ</Button>
                    </>
            }
        </section>
    )
}

export default BurgerPrice