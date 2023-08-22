import React, {useContext} from 'react';
import styles from "./ingredients-container.module.css"
import IngredientGroup from "../ingredient-group/ingredient-group";
import PropTypes from "prop-types";
import {BUN, MAIN, SAUCE} from "../../../utils/constants";
import {IngredientsContext} from "../../../services/ingredientsContext";

const IngredientsContainer = function({onScroll}) {

    const {onClick: onClick} = useContext(IngredientsContext)

    function onItemClick(item, counter) {
        onClick(item, counter);
    }

     function handleScroll(event) {
         onScroll(event)
    }


    return (
        <section className={`${styles.scroll} custom-scroll`} onScroll={handleScroll}>
            <section id = {BUN} className="scroll-section" data-offset={0}>
                <IngredientGroup name="Булки" filter={BUN} key="1"/>
            </section>
            <section id={SAUCE} className="scroll-section" data-offset={310}>
                <IngredientGroup name="Соусы" filter={SAUCE} key="2"/>
            </section>
            <section id={MAIN} className="scroll-section" data-offset={840}>
                <IngredientGroup name="Начинки" filter={MAIN} key="3"/>
            </section>
        </section>
    )
}

export default IngredientsContainer

IngredientsContainer.propTypes = {
  OnItemClick: PropTypes.func,
  handleScroll: PropTypes.func
}