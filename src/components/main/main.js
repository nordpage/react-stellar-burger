import React from 'react';
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function Main(props) {
    const [data, setData] = React.useState(props.data)
    const [constructorData, setConstructorData] = React.useState(props.tempData)

    const onItemClick = (item, counter) =>{
        const newData = [...data]
        const currentItem = newData.find(ingredient => {
            return ingredient._id === item._id
        });
        currentItem.counter = counter
        setData(newData)
        setConstructorData(constructorData => [...constructorData, item])
    }

    return(
        <main className={styles.container}>
            <BurgerIngredients data={data} onItemClick={onItemClick}/>
            <BurgerConstructor ingredients={constructorData}/>
        </main>
    )
}

export default Main