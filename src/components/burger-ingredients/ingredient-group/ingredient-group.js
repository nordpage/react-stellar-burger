import React from 'react';
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredient-group.module.css"

function IngredientGroup(props) {
    const [list] = React.useState(props.data)
    function OnItemClick(item, counter) {
        props.OnItemClick(item, counter)
    }
    function Items (props)  {
        return list.filter(filtered => filtered.type === props.filter).map((item, index) => (
            <IngredientItem item={item} key={index} OnItemClick={OnItemClick}/>
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