import React from "react";
import styles from "./modal-overlay.module.css"

const ModalOverlay = function (props) {

    return(
        <div className={styles.overlay}>
            {props.children}
        </div>
    )
}

export default ModalOverlay