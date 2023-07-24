import React from 'react';
import BurgerPrice from "./burger-price/burger-price";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import BurgerComponent from "./burger-component/burger-component";

const BurgerConstructor = function(props) {


    return(
        <section className={`${styles.container} pt-25`}>
            <BurgerComponent ingredients={props.ingredients}/>
            {
                props.ingredients.length > 0 && <BurgerPrice items={props.ingredients}/>
            }
        </section>
    )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
}