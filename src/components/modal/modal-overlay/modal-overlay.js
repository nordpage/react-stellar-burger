import React from "react";
import styles from "./modal-overlay.module.css"

const ModalOverlay = function (props, {onClick}) {

    const onClose = () => {
        props.onClick()
    }

    return(
        <div className={styles.overlay} onClick={onClose}>
            {props.children}
        </div>
    )
}

export default ModalOverlay