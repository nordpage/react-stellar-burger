import React from 'react';
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredient-group.module.css"
import PropTypes from "prop-types";

const IngredientGroup = function(props) {
    const [list] = React.useState(props.data)
    function onItemClick(item, type) {
        props.onItemClick(item, type)
    }
    function Items (props)  {
        return list.filter(filtered => filtered.type === props.filter).map((item, index) => (
            <IngredientItem item={item} key={index} onItemClick={onItemClick}/>
        ))
    }


    return(
        <section className={`${styles.scroll_margin} mt-10 mb-6`} id={props.uid}>
            <h2 className="text text_type_main-medium" >{props.name}</h2>
            <ul className={`${styles.cards} ml-2 mr-2`}>
                <Items filter={props.uid}/>
            </ul>
        </section>
    )
}

export default IngredientGroup

IngredientGroup.propTypes = {
  OnItemClick: PropTypes.func,
  data: PropTypes.array.isRequired,
  filter: PropTypes.string,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired
}