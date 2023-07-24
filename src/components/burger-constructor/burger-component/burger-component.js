import React, {useEffect, useMemo} from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import {BUN} from "../../../utils/constants";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

const BurgerComponent = function (props) {

    const [list, setList] = React.useState(props.ingredients)

    useEffect(() => {
        setList(props.ingredients)
    }, [props])

    const memorizedTopBun = useMemo(() => {
        return list.filter(item => item.type === BUN)[0]
    }, [list])

    const memorizedBottomBun = useMemo(() => {
        return list.filter(item => item.type === BUN)[1]
    }, [list])

    const memorizedIngredients = useMemo(() => {
        return list.filter(item => item.type !== BUN).map((ingredient, index) =>
            <BurgerIngredient item={ingredient} key={index}/>
        )
    }, [list])

    return(
        <div>
            {memorizedTopBun && <div className="mb-4 ml-8 mr-2">
                <ConstructorElement
                    type={"top"}
                    isLocked
                    text={memorizedTopBun.name}
                    price={memorizedTopBun.price}
                    thumbnail={memorizedTopBun.image}
                />
            </div>}
            <div className={`${styles.ingredients} custom-scroll`}>
                {
                    memorizedIngredients
                }
            </div>
            {memorizedBottomBun && <div className="ml-8">
                <ConstructorElement
                    type={"bottom"}
                    isLocked
                    text={memorizedBottomBun.name}
                    price={memorizedBottomBun.price}
                    thumbnail={memorizedBottomBun.image}
                />
            </div>}
        </div>
    )
}

export default BurgerComponent