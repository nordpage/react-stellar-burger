import React from "react";
import styles from "./modal-overlay.module.css"
type Props = {
    onClick: () => void,
    children: React.ReactNode
}
const ModalOverlay = function ({onClick, children} : Props) {

    const onClose = () => {
        onClick()
    }

    return(
        <div className={styles.overlay} onClick={onClose}>
            {children}
        </div>
    )
}

export default ModalOverlay