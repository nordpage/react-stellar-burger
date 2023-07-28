import React from 'react';

import styles from "./ingredients-container.module.css"
import IngredientGroup from "../ingredient-group/ingredient-group";
import PropTypes from "prop-types";
import {BUN, MAIN, SAUCE} from "../../../utils/constants";

const IngredientsContainer = function(props) {

    function onItemClick(item, type) {
        props.onItemClick(item, type)
    }

     function handleScroll(event) {
        props.handleScroll(event)
    }


    return (
        <section className={`${styles.scroll} custom-scroll`} onScroll={handleScroll}>
            <section id = {BUN} className="scroll-section" data-offset={0}>
                <IngredientGroup name="Булки" uid={BUN} data={props.data} key="1" onItemClick={onItemClick}/>
            </section>
            <section id={SAUCE} className="scroll-section" data-offset={310}>
                <IngredientGroup name="Соусы" uid={SAUCE} data={props.data} key="2" onItemClick={onItemClick}/>
            </section>
            <section id={MAIN} className="scroll-section" data-offset={840}>
                <IngredientGroup name="Начинки" uid={MAIN} data={props.data} key="3" onItemClick={onItemClick}/>
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