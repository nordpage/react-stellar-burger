import React from 'react';
import styles from './not-found.module.css'
import Spaceman from '../images/404.jpg'

function NotFound() {
    return (
        <div className={styles.container}>
            <img alt="404 image" src={Spaceman}/>
        </div>
    );
}

export default NotFound;