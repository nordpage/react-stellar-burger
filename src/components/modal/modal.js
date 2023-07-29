import React, {useEffect, useState} from "react";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

const Modal = function (props) {
    const [visibility, setVisibility] = useState(props.shown)

    const onClose = () => {
        props.onClose()
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


    return(
        <div className={`${styles.window} ${visibility ? styles.showModal : styles.hideModal}`} onAnimationEnd={() => onAnimationEnd()}>
            <div className={`${styles.top} mt-10 ml-10 mr-10`}>
                {props.title && <h1 className={`${styles.title} text text_type_main-large`}>{props.title}</h1>}
                <div className={styles.closeContainer}><CloseIcon type="primary" onClick={() => setVisibility(false)}/></div>
            </div>
            <div className={`${styles.container} ml-25 mr-25 mb-15`}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal

Modal.propTypes = {
    shown: PropTypes.bool.isRequired,
    title: PropTypes.string,
    children: ingredientPropType.isRequired,
    onClose: PropTypes.func.isRequired
}