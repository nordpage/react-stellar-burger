import React, {useEffect, useState} from "react";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";
import ReactDOM from "react-dom";

const Modal = function ({title, children, shown, onModalClose}) {
    const [visibility, setVisibility] = useState(shown)

    const onClose = () => {
        onModalClose()
    }

    const onAnimationEnd = () => {
        if (!visibility) onClose()
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
               setVisibility(false)
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);


    return ReactDOM.createPortal(
        <ModalOverlay onClick={onClose}>
            <div className={`${styles.window} ${visibility ? styles.showModal : styles.hideModal}`} onAnimationEnd={() => onAnimationEnd()}>
                <div className={`${styles.top} mt-10 ml-10 mr-10`}>
                    {title && <h1 className={`${styles.title} text text_type_main-large`}>{title}</h1>}
                    <div className={styles.closeContainer}><CloseIcon type="primary" onClick={() => setVisibility(false)}/></div>
                </div>
                <div className={`${styles.container} ml-25 mr-25 mb-15`}>
                    {children}
                </div>
            </div>
        </ModalOverlay>,
        document.body
    )
}

export default Modal

Modal.propTypes = {
    shown: PropTypes.bool.isRequired,
    title: PropTypes.string,
    children: ingredientPropType.isRequired,
    onModalClose: PropTypes.func.isRequired
}