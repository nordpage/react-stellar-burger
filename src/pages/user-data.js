import React, {useEffect, useState} from 'react';
import styles from './user-data.module.css'
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useGetUserDataQuery, usePostLogoutMutation} from "../services/reducers/burgerApi";
import {getCookie} from "../services/cookies/cookies";

function UserDataPage() {


    const [user, setUser] = useState({ name: null, email: null });

    const {
        data = {},
        isError,
        error,
        isSuccess
    } = useGetUserDataQuery();


    useEffect( () => {
        if (isSuccess && data !== undefined) {
            setUser(data.user)
        } else if (isError) {

        }
    }, [data]);


    return (
        <div className={styles.container}>
            <EmailInput
                placeholder={'Имя'}
                isIcon={true}
                name={'name'}
                value={user.name}
                defaultValue=""
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <EmailInput
                placeholder={'Логин'}
                isIcon={true}
                name={'login'}
                value={user.email}
                defaultValue=""
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <PasswordInput
                placeholder={'Пароль'}
                icon={'EditIcon'}
                name={'password'}
                value="******"
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
        </div>
    );
}

export default UserDataPage;