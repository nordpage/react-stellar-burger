import React from 'react';
import styles from "../feed.module.css";

function ImageSlot({image, isExtra, extra}) {
    return (
        isExtra && extra !== 0 ? <div className={styles.extra}><img className={styles.extraImage} src={image}/><p className={`${styles.extraTitle} text text_type_main-medium`}>+{extra}</p></div> : <div className={styles.slot}><img className={styles.image} src={image}/></div>
    );
}

export default ImageSlot;