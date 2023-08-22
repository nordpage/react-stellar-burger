import React, {useContext} from 'react';
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredient-group.module.css"
import PropTypes from "prop-types";
import {IngredientsContext} from "../../../services/ingredientsContext";

const IngredientGroup = function({filter, name}) {

    const {data: data, onClick: onClick} = useContext(IngredientsContext)

    function onItemClick(item, counter) {
        onClick(item, counter);
    }
    function Items ()  {
        return data.filter(filtered => filtered.type === filter).map((item, index) => (
            <IngredientItem item={item} key={index}/>
        ))
    }


    return(
        <section className={`${styles.scroll_margin} mt-10 mb-6`} id={filter}>
            <h2 className="text text_type_main-medium" >{name}</h2>
            <ul className={`${styles.cards} ml-2 mr-2`}>
                <Items filter={filter}/>
            </ul>
        </section>
    )
}

export default IngredientGroup

IngredientGroup.propTypes = {
  filter: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}