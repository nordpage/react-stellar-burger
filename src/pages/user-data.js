import React from 'react';
import styles from './user-data.module.css'
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {getCookie} from "../services/cookies/cookies";
function UserDataPage() {

    return (
        <div className={styles.container}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                icon={'EditIcon'}
                name={'name'}
                value={getCookie('name')}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <EmailInput
                placeholder={'Логин'}
                isIcon={true}
                name={'login'}
                value={getCookie('email')}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <PasswordInput
                placeholder={'Пароль'}
                icon={'EditIcon'}
                name={'password'}
                value={getCookie('password')}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
        </div>
    );
}

export default UserDataPage;