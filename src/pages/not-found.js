import React from 'react';
import styles from './not-found.module.css'
import Spaceman from '../images/404.jpg'

function NotFound(props) {
    return (
        <div className={styles.container}>
            <img src={Spaceman}/>
        </div>
    );
}

export default NotFound;