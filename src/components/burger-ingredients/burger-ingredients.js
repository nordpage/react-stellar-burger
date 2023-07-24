import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";

import IngredientsContainer from "./ingredients-container/ingredients-container";
import PropTypes from "prop-types";
import {BUN, MAIN, SAUCE} from "../../utils/constants";


const BurgerIngredients = function(props) {
    const [current, setCurrent] = React.useState('bun')

    function chooseTab(currentValue) {
        setCurrent(currentValue)
        const element = document.getElementById(currentValue);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

    const handleScroll = event => {
        const scrollPosition = event.currentTarget.scrollTop;
        const ingredientsContainer = document.querySelector('.custom-scroll');
        const sections = ingredientsContainer.querySelectorAll('.scroll-section');

        sections.forEach((section) => {
            const offset = parseInt(section.dataset.offset);

            if (scrollPosition >= offset - 20) {
                setCurrent(section.id);
            }
        });
    };

    function onItemClick(item, counter) {
        props.onItemClick(item, counter)
    }

    return (
        <section className={`${styles.container} mb-10`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}} className="mb-10">
                <Tab value="one" active={current === BUN} onClick={() => chooseTab(BUN)}>
                    Булки
                </Tab>
                <Tab value="two" active={current === SAUCE} onClick={() => chooseTab(SAUCE)}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === MAIN} onClick={() => chooseTab(MAIN)}>
                    Начинки
                </Tab>
            </div>
            <IngredientsContainer onItemClick={onItemClick} handleScroll={handleScroll} data={props.data}/>
        </section>
    )

}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  OnItemClick: PropTypes.func,
  data: PropTypes.array.isRequired
}