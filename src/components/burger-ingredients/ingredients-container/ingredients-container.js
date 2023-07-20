import React, {useEffect, useState} from 'react';

import stylesIngredientContainer from "./ingredients-container.module.css"
import IngredientGroup from "../ingredient-group/ingredient-group";

function IngredientsContainer(props) {
    const [activeSection, setActiveSection] = useState('bun');

    function OnItemClick(item, counter) {
        props.OnItemClick(item, counter)
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll('IngredientGroup');

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollPosition >= sectionTop - 50 && // Adjust the offset as needed
                    scrollPosition < sectionTop + sectionHeight - 50 // Adjust the offset as needed
                ) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <section className={`${stylesIngredientContainer.scroll} custom-scroll`}>
            <IngredientGroup name="Булки" uid="bun" data={props.data} key="1" OnItemClick={OnItemClick}/>
            <IngredientGroup name="Соусы" uid="sauce" data={props.data} key="2" OnItemClick={OnItemClick}/>
            <IngredientGroup name="Начинки" uid="main" data={props.data} key="3" OnItemClick={OnItemClick}/>
        </section>
    )
}

export default IngredientsContainer