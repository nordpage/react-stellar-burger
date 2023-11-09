import React, {useCallback, useMemo} from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addToBurger, sorting} from "../../../services/reducers/burgerSlice";

const BurgerComponent = function () {

    const {cart} = useSelector((store) => store.burger)
    const dispatch = useDispatch()


    const [{ isHover }, dropRef] = useDrop({
        accept: 'ingredient',
        collect: (monitor) => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch(addToBurger(item))
        }
    })


    const moveIngredient = useCallback((dragIndex, hoverIndex) => {
        dispatch(sorting({dragIndex, hoverIndex}))
    }, [dispatch])
    const renderIngredient = useCallback((ingredient, index) => {
        return (
            <BurgerIngredient item={ingredient} index={index} id={ingredient.uid} key={ingredient.key} moveIngredient = {moveIngredient}/>
        )
    }, [])


    const memorizedIngredients = useMemo(() => {
        return cart.ingredients.map((ingredient, index) =>
            renderIngredient(ingredient, index)
        )
    }, [cart.ingredients])

    return(
        <div className={`${styles.burger} pt-25`}  ref={dropRef}>
            {
                (cart.bun || cart.ingredients.length > 0) ? <div>
                    {cart.bun &&
                        <div className="mr-8 ml-8" key="top">
                            <ConstructorElement
                                type={"top"}
                                isLocked
                                text={`${cart.bun.name} (верх)`}
                                price={cart.bun.price}
                                thumbnail={cart.bun.image}
                            />
                        </div>}
                    <div className={`${styles.ingredients} custom-scroll mr-4 mt-4 mb-4`}>
                        {
                            memorizedIngredients
                        }
                    </div>
                    {cart.bun &&
                        <div className="mr-8 ml-8" key="bottom">
                            <ConstructorElement
                                type={"bottom"}
                                isLocked
                                text={`${cart.bun.name} (низ)`}
                                price={cart.bun.price}
                                thumbnail={cart.bun.image}
                            />
                        </div>
                    }
                </div> : <div className={styles.placeholderContainer}>
                    <h1 className="text text_type_main-medium">Добавьте булку и ингредиенты в конструктор</h1>
                </div>
            }
        </div>
    )
}

export default BurgerComponent