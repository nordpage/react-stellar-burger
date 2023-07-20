import React from 'react';
import styles from "../app/app.module.css";
import BurgerIngredients from "../burger-ingredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";

function Main(props) {
    const [data, setData] = React.useState(props.data)
    const [constructorData, setConstructorData] = React.useState([])

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
        <main className={styles.main}>
            <BurgerIngredients data={data} OnItemClick={OnItemClick}/>
            <BurgerConstructor ingredients={constructorData}/>
        </main>
    )
}

export default Main