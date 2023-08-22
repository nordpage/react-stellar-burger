import React, {useContext, useEffect, useReducer, useState} from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-price.module.css"
import {modalTypes} from "../../../utils/modal-types";
import {BUN} from "../../../utils/constants";
import {ConstructorContext} from "../../../services/constructorContext";
import {fetchOrder} from "../../../utils/api";

const initialState = { sum: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_SUM':
            return { sum: action.payload };
        case 'SUBSTRACT_FROM_SUM':
            return { sum: action.payload };
        default:
            return state;
    }
}

const BurgerPrice = function() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const {data: constructorData, onCheckOut: onClick} = useContext(ConstructorContext)
    const [apiState, setApiState] = useState({
        isLoading: false,
        hasError: false,
        data: {
            "name": String,
            "order": {
                "number": Number
            },
            "success": Boolean
        }
    })

    const handleButtonClick = () => {
        const sum = constructorData.reduce((acc, curr) => curr.type === BUN ?  acc + curr.price * 2: acc + curr.price, 0);
        dispatch({ type: 'ADD_TO_SUM', payload: sum });
    };

    function removeFromCart() {
        const sum = constructorData.reduce((acc, curr) => acc - curr.price, 0);
        dispatch({ type: 'SUBSTRACT_FROM_SUM', payload: sum });
    }

    useEffect(() => {
        handleButtonClick()
    }, [constructorData]);
    


    const onOrderClick = (type) => {
        const bun = constructorData.find(item => item.type === BUN)._id
        const ids = constructorData.map(item => item._id)
        ids.push(bun)
        setApiState({...apiState, hasError: false, isLoading: true})
        fetchOrder(ids)
            .then(data => {
                setApiState({...apiState, data: data, isLoading: false})
                onClick(type, data.order.number)
            })
            .catch(() => setApiState({...apiState, hasError: true, isLoading: false}))
    }

    return(
        <section className={`${styles.bottomContainer} mt-10 mr-4`}>
            <div className={styles.priceContainer}><p className="text text_type_digits-medium">{state.sum}</p> <CurrencyIcon type="primary"/></div>
            <Button htmlType="button" type="primary" size="large" onClick={() => onOrderClick(modalTypes.Order)}>Оформить заказ</Button>
        </section>
    )
}

export default BurgerPrice