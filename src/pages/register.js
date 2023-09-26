import React from 'react';
import AppHeader from "../components/header/appHeader";
import styles from "./inputs.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();


    function toLogin() {
        navigate("/login")
    }

    return(
        <div>
            <AppHeader/>
            <div className={styles.container}>
                <p className="text text_type_main-default">Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    name={'name'}
                    icon={'ShowIcon'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6">
                    Зарегистрироваться
                </Button>
                <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Уже зарегистрированы?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                    Войти</Button></div>
            </div>
        </div>
    );
}

export default RegisterPage;