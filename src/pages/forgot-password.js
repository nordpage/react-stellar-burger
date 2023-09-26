import React from 'react';
import AppHeader from "../components/header/appHeader";
import styles from "./inputs.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";

export const ForgotPasswordPage = () => {

    const navigate = useNavigate();


    function toLogin() {
        navigate("/login")
    }

    return (
        <div>
            <AppHeader/>
            <div className={styles.container}>
                <p className="text text_type_main-default">Восстановление пароля</p>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6">
                    Восстановить
                </Button>
                <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Вспомнили пароль?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                    Войти</Button></div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;