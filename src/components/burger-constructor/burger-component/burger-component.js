import React, {useContext, useMemo} from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import {BUN} from "../../../utils/constants";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {ConstructorContext} from "../../../services/constructorContext";

const BurgerComponent = function () {

    const {data: constructorData, onRemove: onRemove} = useContext(ConstructorContext)

    function onRemoveFromCart(item) {
        onRemove(item)
    }

    const memorizedTopBun = useMemo(() => {
        return constructorData.find(item => item.type === BUN)
    }, [constructorData])

    const memorizedBottomBun = useMemo(() => {
        return constructorData.find(item => item.type === BUN)
    }, [constructorData])

    const memorizedIngredients = useMemo(() => {
        return constructorData.filter(item => item.type !== BUN).map((ingredient, index) =>
            <BurgerIngredient item={ingredient} key={index}/>
        )
    }, [constructorData])

    return(
        <div className={styles.burger}>
            {memorizedTopBun &&
                <div className="mr-8 ml-8" key="top">
                    <ConstructorElement
                        type={"top"}
                        isLocked
                        text={memorizedTopBun.name}
                        price={memorizedTopBun.price}
                        thumbnail={memorizedTopBun.image}
                        extraClass="mb-4"
                    />
                </div>}
            <div className={`${styles.ingredients} custom-scroll mr-4`}>
                {
                    memorizedIngredients
                }
            </div>
            {memorizedBottomBun &&
                <div className="mr-8 ml-8" key="bottom">
                <ConstructorElement
                    type={"bottom"}
                    isLocked
                    text={memorizedBottomBun.name}
                    price={memorizedBottomBun.price}
                    thumbnail={memorizedBottomBun.image}
                />
                </div>
            }
        </div>
    )
}

export default BurgerComponent