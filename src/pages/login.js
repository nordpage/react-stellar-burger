import React, {useCallback, useState} from 'react';
import styles from "./inputs.module.css"
import AppHeader from "../components/header/appHeader";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import {loginRequest} from "../services/api";
import {setCookie} from "../services/cookies/cookies";
import {usePostLoginMutation} from "../services/reducers/burgerApi";

export const LoginPage = () => {

    const [posrLogin] = usePostLoginMutation();
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };


    const [form, setValue] = useState({ email: '', password: '' });

    const [isEmailError, setEmailError] = useState(false)
    const [isPasswordError, setPasswordError] = useState(false)

    const navigate = useNavigate();

    function toRegister() {
        navigate("/register")
    }

    function toForgotPassword() {
        navigate("/forgot-password")
    }

    const loginUser = async form => {
        setEmailError(false)
        setPasswordError(false)
        if (form.email && form.password) {
            const data = await loginRequest(form)
                .then(res => res.json())
                .then(data => data)

            if (data.success) {
                setCookie('accessToken', data.accessToken)
                setCookie('refreshToken', data.refreshToken)
                navigate("/")
            }
        } else {
            if (form.email === ''){
                setEmailError(true)
            }
            if (form.password === ''){
                setPasswordError(true)
            }
        }
    }

    let login = useCallback(
        e => {
            e.preventDefault()
            loginUser(form)
        },
        [form]
    )

    return (
        <div>
            <AppHeader/>
            <div className={styles.container}>
                <p className="text text_type_main-default">Вход</p>
                <form>
                    <EmailInput
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        error={isEmailError}
                        errorText={'Поле \"E-mail\" не может быть пустым'}
                        placeholder="E-mail"
                        extraClass="mt-6"
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        placeholder={'Пароль'}
                        name={'password'}
                        error={isPasswordError}
                        errorText={'Поле \"Пароль\" не может быть пустым'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                </form>
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={login}>
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