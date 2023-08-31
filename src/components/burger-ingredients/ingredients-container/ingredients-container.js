import React from 'react';
import styles from "./ingredients-container.module.css"
import IngredientGroup from "../ingredient-group/ingredient-group";
import PropTypes from "prop-types";
import {BUN, MAIN, SAUCE} from "../../../utils/constants";
import {useSelector} from "react-redux";
import {getIngredientsSelector} from "../../../services/reducers/ingredientsSlice";

const IngredientsContainer = function({onScroll}) {

     function handleScroll(event) {
         onScroll(event)
    }

    const keys = [BUN, SAUCE, MAIN]
    const hashMap = useSelector(getIngredientsSelector)
    const groups = (hashMap) => {
         if (hashMap.size > 0) {
             return <section className={`${styles.scroll} custom-scroll`} onScroll={handleScroll}>
                 {
                     Array.from(keys).map((key, index) => {
                         const values = hashMap.get(key);
                         return <section id = {key} className="scroll-section" data-offset={0}  key={index}>
                             <IngredientGroup name={values.name} ingredients={values.ingredients}/>
                         </section>
                     })
                 }
             </section>
         } else {
             return <div></div>
         }
    }

    return (
        groups(hashMap)
    )
}

export default IngredientsContainer

IngredientsContainer.propTypes = {
  handleScroll: PropTypes.func
}