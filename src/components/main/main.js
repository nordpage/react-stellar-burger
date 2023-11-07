import React, {useEffect} from 'react';
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import {modalTypes} from "../../utils/modal-types";
import OrderDetails from "../modal/order-details/order-details";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import {
    addCurrentIngredient
} from "../../services/reducers/currentIngredientSlice";
import {useDispatch, useSelector} from "react-redux";
import {addOrderNumber} from "../../services/reducers/orderSlice";
import {closeModal} from "../../services/reducers/modalSlice";
import {clearCart} from "../../services/reducers/burgerSlice";
import {useNavigate} from "react-router-dom";

function Main() {

    const dispatch = useDispatch()
    const {currentIngredient} = useSelector((store) => store.currentIngredient)
    const {order} = useSelector((store) => store.order)
    const {modal} = useSelector((store) => store.modal)
    const navigate = useNavigate();


    // const modalWindow = (modalType) => {
    //     switch (modalType) {
    //         case modalTypes.Order:
    //             return <Modal shown={modal.isOpen} onModalClose={() => {
    //                 dispatch(addOrderNumber(0))
    //                 dispatch(clearCart())
    //                 dispatch(closeModal())
    //             }}>
    //                 <OrderDetails order= {order.orderNumber} />
    //             </Modal>
    //         case modalTypes.Ingredient:
    //             return <Modal shown={modal.isOpen} onModalClose={() => {
    //                 dispatch(addCurrentIngredient(null))
    //                 dispatch(closeModal())
    //             }} title="Детали ингредиента">
    //                 <IngredientDetails item = {currentIngredient}/>
    //             </Modal>
    //     }
    // }

    return(
        <>
            <main className={styles.container}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </main>

        </>
    )
}

export default Main