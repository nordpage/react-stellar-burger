import React from 'react';

import styles from "./ingredients-container.module.css"
import IngredientGroup from "../ingredient-group/ingredient-group";
import PropTypes from "prop-types";

const IngredientsContainer = function(props) {

    function onItemClick(item, counter) {
        props.onItemClick(item, counter)
    }

     function handleScroll(event) {
        props.handleScroll(event)
    }


    return (
        <section className={`${styles.scroll} custom-scroll`} onScroll={handleScroll}>
            <section id ="bun" className="scroll-section" data-offset={0}>
                <IngredientGroup name="Булки" uid="bun" data={props.data} key="1" onItemClick={onItemClick}/>
            </section>
            <section id="sauce" className="scroll-section" data-offset={310}>
                <IngredientGroup name="Соусы" uid="sauce" data={props.data} key="2" onItemClick={onItemClick}/>
            </section>
            <section id="main" className="scroll-section" data-offset={840}>
                <IngredientGroup name="Начинки" uid="main" data={props.data} key="3" onItemClick={onItemClick}/>
            </section>
        </section>
    )
}

export default IngredientsContainer

IngredientsContainer.propTypes = {
  OnItemClick: PropTypes.func,
  data: PropTypes.array.isRequired,
  handleScroll: PropTypes.func
}