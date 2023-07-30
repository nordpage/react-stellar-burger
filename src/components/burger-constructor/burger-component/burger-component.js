import React, {useMemo} from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import {BUN} from "../../../utils/constants";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

const BurgerComponent = function ({ingredients}) {

    const memorizedTopBun = useMemo(() => {
        return ingredients.filter(item => item.type === BUN)[0]
    }, [ingredients])

    const memorizedBottomBun = useMemo(() => {
        return ingredients.filter(item => item.type === BUN)[1]
    }, [ingredients])

    const memorizedIngredients = useMemo(() => {
        return ingredients.filter(item => item.type !== BUN).map((ingredient, index) =>
            <BurgerIngredient item={ingredient} key={index}/>
        )
    }, [ingredients])

    return(
        <div className={styles.burger}>
            {memorizedTopBun &&
                <div className="mr-8 ml-8">
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
                <div className="mr-8 ml-8">
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