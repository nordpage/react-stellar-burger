import React, {useEffect} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerPrice from "./burger-price/burger-price";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

const BurgerConstructor = function(props) {

    const [list, setList] = React.useState(props.ingredients)

    useEffect(() => {
        setList(props.ingredients)
    }, [props])

    function Burger() {
        const topBun = list.filter(item => item.type === "bun")[0]
        const bottomBun = list.filter(item => item.type === "bun")[1]
        return(
            <div>
                {topBun && <div className="mb-4 ml-8 mr-2">
                    <ConstructorElement
                    type={"top"}
                    isLocked={true}
                    text={topBun.name}
                    price={topBun.price}
                    thumbnail={topBun.image}
                    />
                </div>}
                <div className={`${styles.ingredients} custom-scroll`}>
                    {
                        list.filter(item => item.type !== "bun").map((ingredient, index) =>
                            <Ingredient item={ingredient} key={index}/>
                        )
                    }
                </div>
                {bottomBun && <div className="ml-8">
                    <ConstructorElement
                    type={"bottom"}
                    isLocked={true}
                    text={bottomBun.name}
                    price={bottomBun.price}
                    thumbnail={bottomBun.image}
                    />
                </div>}
            </div>
        )
    }
    const Ingredient = (props) =>  {
        return <div className="mb-4">
                <DragIcon type="primary"/> <ConstructorElement
                text={props.item.name}
                price={props.item.price}
                thumbnail={props.item.image}
            />
            </div>

    }

    return(
        <section className={`${styles.container} pt-25`}>
            <Burger/>
            {
                list.length > 0 && <BurgerPrice items={list}/>
            }
        </section>
    )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  item: ingredientPropType,
  ingredients: PropTypes.array.isRequired
}