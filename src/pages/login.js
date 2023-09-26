import React from 'react';
import styles from "./inputs.module.css"
import AppHeader from "../components/header/appHeader";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();

    function toRegister() {
        navigate("/register")
    }

    function toForgotPassword() {
        navigate("/forgot-password")
    }

    return (
        <div>
            <AppHeader/>
            <div className={styles.container}>
                <p className="text text_type_main-default">Вход</p>
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
                    Войти
                </Button>
                <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Вы — новый пользователь?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toRegister()}>
                    Зарегистрироваться</Button></div>
                <div className={`${styles.buttons} mt-6`}><p className="text text_type_main-default">Забыли пароль?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toForgotPassword()}>
                    Восстановить пароль</Button></div>
            </div>
        </div>
    );
}

export default LoginPage;