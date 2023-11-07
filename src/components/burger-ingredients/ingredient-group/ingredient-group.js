import React from 'react';
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredient-group.module.css"
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";

const IngredientGroup = function({ingredients, name}) {

    const location = useLocation();

    function Items ()  {
        return ingredients.map((item, index) => (
            <Link
                key={item._id}
                // Тут мы формируем динамический путь для нашего ингредиента
                to={`/ingredients/${item._id}`}
                // а также сохраняем в свойство background роут,
                // на котором была открыта наша модалка
                state={{ background: location }}
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

IngredientGroup.propTypes = {
  name: PropTypes.string.isRequired
}