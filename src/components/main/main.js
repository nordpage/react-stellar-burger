import React, {useState} from 'react';
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import {modalTypes} from "../../utils/modal-types";
import OrderDetails from "../modal/order-details/order-details";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import {ConstructorContext} from "../../services/constructorContext";
import {IngredientsContext} from "../../services/ingredientsContext";

function Main({mainData}) {
    const [data, setData] = React.useState(mainData)
    const [constructorData, setConstructorData] = React.useState([])
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [currentItem, setCurrentItem] = useState()
    const [order, setOrder] = useState(0)

    const onItemClick = (item, counter) =>{
        const newData = [...data]
        const currentItem = newData.find(ingr => {
            return ingr._id === item._id
        });
        currentItem.counter = counter
        setData(newData)
        setConstructorData(constructorData => [...constructorData, item])
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

    function onRemoveFromCart(item) {
        const newData = [...constructorData];
        const index = newData.indexOf(item);
        if (index !== -1) {
            newData.splice(index, 1);
            setConstructorData(newData)
        }
        const ingredients = [...data]
        const currentItem = ingredients.find(ingr => {
            return ingr._id === item._id
        });
        currentItem.counter = item.counter-1
        setData(ingredients)
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
                <IngredientsContext.Provider value={{data: data, onClick: onItemClick}}>
                    <BurgerIngredients/>
                </IngredientsContext.Provider>
                <ConstructorContext.Provider value={{data: constructorData, onCheckOut: onOrderClick, onRemove: onRemoveFromCart}}>
                    <BurgerConstructor/>
                </ConstructorContext.Provider>
            </main>
            {
               modal && modalWindow(modalType)
            }

        </>
    )
}

export default Main