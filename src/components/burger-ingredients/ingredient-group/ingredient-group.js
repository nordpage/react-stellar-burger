import React from 'react';
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredient-group.module.css"
import PropTypes from "prop-types";

const IngredientGroup = function({data, filter, name, onClick}) {
    const [list] = React.useState(data)
    function onItemClick(item, counter) {
        onClick(item, counter);
    }
    function Items ()  {
        return list.filter(filtered => filtered.type === filter).map((item, index) => (
            <IngredientItem item={item} key={index} onClick={onItemClick}/>
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
  OnItemClick: PropTypes.func,
  data: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}