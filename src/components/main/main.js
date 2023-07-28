import React, {useState} from 'react';
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Overlay from "../overlay/overlay";
import Modal from "../modal/modal";

function Main(props) {
    const [data, setData] = React.useState(props.data)
    const [constructorData, setConstructorData] = React.useState(props.tempData)
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [currentItem, setCurrentItem] = useState()

    const onItemClick = (item, type) =>{
       setModal(true);
       setModalType(type);
       setCurrentItem(item)
    }

    return(
        <>
            <main className={styles.container}>
                <BurgerIngredients data={data} onItemClick={onItemClick}/>
                <BurgerConstructor ingredients={constructorData}/>
            </main>
            {
                modal && <div>
                    <Modal item={currentItem} type={modalType}/>
                </div>

            }
        </>
    )
}

export default Main