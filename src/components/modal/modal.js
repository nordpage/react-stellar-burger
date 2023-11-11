import React, {useEffect} from "react";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";

const Modal = function ({title, children, onModalClose}) {

    const onClose = () => {
        onModalClose()
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
               onClose()
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);


    return ReactDOM.createPortal(
        <div className={styles.modal}>
            <ModalOverlay onClick={onClose}/>
            <div className={`${styles.window}`}>
                <div className={`${styles.top} mt-10 ml-10 mr-10`}>
                    {title && <h1 className={`${styles.title} text text_type_main-large`}>{title}</h1>}
                    <div className={styles.closeContainer} onClick={onClose}><CloseIcon type="primary"/></div>
                </div>
                <div className={`${styles.container} ml-25 mr-25 mb-15`}>
                    {children}
                </div>
            </div>
        </div>,
        document.querySelector("#modals")
    )
}

export default Modal

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onModalClose: PropTypes.func.isRequired
}