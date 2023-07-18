import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import stylesIngredients from './ingredients.module.css';

import BurgerCard from "./burgerCard";

function BurgerIngredients(props)  {
    const [current, setCurrent] = React.useState('bun')
    const [list, setList] = React.useState(props.data)

       function chooseTab(currentValue) {
            setCurrent(currentValue)
           const element = document.getElementById(currentValue);
           if (element) {
               element.scrollIntoView({ behavior: 'smooth' });
           }
       }

        function Items (props)  {
            return list.filter(filtered => filtered.type === props.filter).map(item => (
               <BurgerCard item={item} key={item.id}/>
            ))
        }

        return (
            <div className="mb-10">
                <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
                <div style={{ display: 'flex' }} className="mb-10">
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
                <div className={`${stylesIngredients.scroll} custom-scroll`}>
                    <div className={`${stylesIngredients.scroll_margin}mb-6`} id="bun">
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <ul className={`${stylesIngredients.cards} ml-2 mr-2`}>
                        <Items filter="bun"/>
                    </ul>
                    </div>
                    <div className={`${stylesIngredients.scroll_margin} mt-10 mb-6`} id="sauce">
                        <h2 className="text text_type_main-medium">Соусы</h2>
                        <ul className={`${stylesIngredients.cards} ml-2 mr-2`}>
                            <Items filter="sauce"/>
                        </ul>
                    </div>
                    <div className={`${stylesIngredients.scroll_margin} mt-10 mb-6`} id="main">
                        <h2 className="text text_type_main-medium" >Начинки</h2>
                        <ul className={`${stylesIngredients.cards} ml-2 mr-2`}>
                            <Items filter="main"/>
                        </ul>
                    </div>
                </div>
            </div>
        )

}

export default BurgerIngredients;