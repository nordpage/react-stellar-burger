import React, {useState} from 'react';
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import {modalTypes} from "../../utils/modal-types";
import OrderDetails from "../modal/order-details/order-details";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";

function Main({mainData, tempData}) {
    const [data] = React.useState(mainData)
    const [constructorData, setConstructorData] = React.useState(tempData)
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [currentItem, setCurrentItem] = useState()
    const [order, setOrder] = useState(null)

    const onItemClick = (item, type) =>{
       setModal(true);
       setModalType(type);
       setCurrentItem(item)
    }

    const onOrderClick = (type, order) => {
        setModal(true)
        setModalType(type)
        setOrder(order)
    }

    const onClose = () => {
        setModal(false)
        setModalType("")
    }

    const modalWindow = (modalType) => {
        switch (modalType) {
            case modalTypes.Order:
                return <Modal shown={modal} onModalClose={onClose}>
                    <OrderDetails order= {order} />
                </Modal>
            case modalTypes.Ingredient:
                return <Modal shown={modal} onModalClose={onClose} title="Детали ингредиента">
                    <IngredientDetails item = {currentItem}/>
                </Modal>
        }
    }

    return(
        <>
            <main className={styles.container}>
                <BurgerIngredients data={data} onClick={onItemClick}/>
                <BurgerConstructor ingredients={constructorData} onClick={onOrderClick}/>
            </main>
            {
               modal && modalWindow(modalType)
            }

        </>
    )
}

export default Main