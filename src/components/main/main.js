import React from 'react';
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function Main(props) {
    const [data, setData] = React.useState(props.data)
    const [constructorData, setConstructorData] = React.useState(props.tempData)

    const OnItemClick = (item, counter) =>{
        const newData = [...data]
        const currentItem = newData.find(ingr => {
            return ingr._id === item._id
        });
        currentItem.counter = counter
        setData(newData)
        setConstructorData(constructorData => [...constructorData, item])
    }

    return(
        <main className={styles.container}>
            <BurgerIngredients data={data} OnItemClick={OnItemClick}/>
            <BurgerConstructor ingredients={constructorData}/>
        </main>
    )
}

export default Main