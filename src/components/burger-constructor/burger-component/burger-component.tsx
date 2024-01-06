import React, {useCallback, useMemo} from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addToBurger, sorting} from "../../../services/reducers/burgerSlice";
import {TStore} from "../../../services/reducers/store";
import {Ingredient} from "../../../utils/types";
import {useAppDispatch} from "../../../hooks/hooks";

const BurgerComponent = function () {

    const {cart} = useSelector((store:TStore) => store.burger)
    const dispatch = useAppDispatch()


    const [{ isHover }, dropRef] = useDrop({
        accept: 'ingredient',
        collect: (monitor) => ({
            isHover: monitor.isOver()
        }),
        drop(item: Ingredient) {
            dispatch(addToBurger(item))
        }
    })


    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(sorting({dragIndex, hoverIndex}))
    }, [dispatch])
    const renderIngredient = useCallback((ingredient: Ingredient, index: number) => {
        return (
            <BurgerIngredient item={ingredient} index={index} id={ingredient.uid} key={ingredient.uid} moveIngredient = {moveIngredient}/>
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
                    <div className={`${styles.ingredients} custom-scroll mr-4 mt-4`}>
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