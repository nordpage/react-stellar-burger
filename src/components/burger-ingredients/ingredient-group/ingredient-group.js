import React from 'react';
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredient-group.module.css"
import PropTypes from "prop-types";

const IngredientGroup = function({ingredients, name}) {

    function Items ()  {
        return ingredients.map((item, index) => (
            <IngredientItem item={item} key={index}/>
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