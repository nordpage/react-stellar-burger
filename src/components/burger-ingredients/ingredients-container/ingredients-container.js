import React from 'react';
import styles from "./ingredients-container.module.css"
import IngredientGroup from "../ingredient-group/ingredient-group";
import PropTypes from "prop-types";
import {BUN, MAIN, SAUCE} from "../../../utils/constants";

const IngredientsContainer = function({data, onClick, onScroll}) {

    function onItemClick(item, counter) {
        onClick(item, counter);
    }

     function handleScroll(event) {
         onScroll(event)
    }


    return (
        <section className={`${styles.scroll} custom-scroll`} onScroll={handleScroll}>
            <section id = {BUN} className="scroll-section" data-offset={0}>
                <IngredientGroup name="Булки" filter={BUN} data={data} key="1" onClick={onItemClick}/>
            </section>
            <section id={SAUCE} className="scroll-section" data-offset={310}>
                <IngredientGroup name="Соусы" filter={SAUCE} data={data} key="2" onClick={onItemClick}/>
            </section>
            <section id={MAIN} className="scroll-section" data-offset={840}>
                <IngredientGroup name="Начинки" filter={MAIN} data={data} key="3" onClick={onItemClick}/>
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