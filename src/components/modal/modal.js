import React from "react";
import styles from "./modal.module.css"

const Modal = function (props) {

    return(
        <div className={styles.background}>
            <div className={styles.window}>
                <div className={styles.top}>Close</div>
                <div className={styles.container}></div>
            </div>
        </div>
    )
}

export default Modal