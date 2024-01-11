import React from 'react';
import styles from "./feed.module.css";

type Props = {
    image: string,
    index: number,
    amount: number
}
function ImageSlot({image, index, amount} : Props) {
    return (
        <div className={`${styles.slot}`} style={{zIndex: index}}><img alt="Ingredient Image" className={styles.image} src={image}/>{amount !== 0 && index === 0 && <p className={`${styles.extraTitle} text text_type_main-default`}>
            +{amount}
        </p>}</div>
    );
}

export default ImageSlot;