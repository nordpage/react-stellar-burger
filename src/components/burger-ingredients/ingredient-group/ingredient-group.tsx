import React from 'react';
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredient-group.module.css"
import {Link, useLocation} from "react-router-dom";
import {Ingredient} from "../../../utils/types";

type Props = {
    ingredients: Ingredient[],
    name: string
}

const IngredientGroup = function({ingredients, name} : Props) {

    const location = useLocation();

    function Items ()  {
        return ingredients.map((item:Ingredient, index:number) => (
            <Link
                key={item._id}
                to={`/ingredients/${item._id}`}
                // а также сохраняем в свойство background роут,
                // на котором была открыта наша модалка
                state={{ background: location }}
                className={styles.link}
            >
            <IngredientItem item={item} key={index}/>
            </Link>
        ))
    }


    return(
        <section className={`${styles.scroll_margin} mt-10 mb-6`}>
            <h2 className="text text_type_main-medium" >{name}</h2>
            <ul className={`${styles.cards} ml-2 mr-2`}>
                <Items/>
            </ul>
        </section>
    )
}

export default IngredientGroup