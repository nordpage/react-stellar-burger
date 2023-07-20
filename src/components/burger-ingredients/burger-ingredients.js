import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";

import IngredientsContainer from "./ingredients-container/ingredients-container";


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

    function OnItemClick(item, counter) {
        props.OnItemClick(item, counter)
    }

    return (
        <section className={`${styles.container} mb-10`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}} className="mb-10">
                <Tab value="one" active={current === 'bun'} onClick={() => chooseTab("bun")}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'sauce'} onClick={() => chooseTab("sauce")}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'main'} onClick={() => chooseTab("main")}>
                    Начинки
                </Tab>
            </div>
            <IngredientsContainer OnItemClick={OnItemClick} handleScroll={handleScroll} data={props.data}/>
        </section>
    )

}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  OnItemClick: PropTypes.func,
  data: PropTypes.array.isRequired
}