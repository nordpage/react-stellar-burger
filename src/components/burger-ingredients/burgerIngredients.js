import React, {useEffect, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import stylesIngredientGroup from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredient-group/ingredient-group";
import stylesIngredientContainer from "./ingredients-container/ingredients-container.module.css"


function BurgerIngredients(props) {
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
        console.log(scrollPosition)
        const sections = document.querySelectorAll('.scroll-section');

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const offset = parseInt(section.dataset.offset);
            console.log(section.id +" SectionTop: " + sectionTop + " " + offset)

            if (
                scrollPosition >= offset - 20
            ) {
                setCurrent(section.id);
            }
        });

        setScrollTop(event.currentTarget.scrollTop);
    };

    function OnItemClick(item, counter) {
        props.OnItemClick(item, counter)
    }

    return (
        <section className={`${stylesIngredientGroup.container} mb-10`}>
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
            <section className={`${stylesIngredientContainer.scroll} custom-scroll`} onScroll={handleScroll}>
                <section id ="bun" className="scroll-section" data-offset={0}>
                    <IngredientGroup name="Булки" uid="bun" data={props.data} key="1" OnItemClick={OnItemClick}/>
                </section>
                <section id="sauce" className="scroll-section" data-offset={310}>
                    <IngredientGroup name="Соусы" uid="sauce" data={props.data} key="2" OnItemClick={OnItemClick}/>
                </section>
                <section id="main" className="scroll-section" data-offset={840}>
                    <IngredientGroup name="Начинки" uid="main" data={props.data} key="3" OnItemClick={OnItemClick}/>
                </section>
            </section>
        </section>
    )

}

export default BurgerIngredients;