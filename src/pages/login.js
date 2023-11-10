import React, {useState} from 'react';
import styles from "./inputs.module.css"
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate } from "react-router-dom";
import {usePostLoginMutation} from "../services/reducers/burgerApi";
import {useDispatch} from "react-redux";
import {setCredentials} from "../services/reducers/authSlice";
import {ACCESS, REFRESH} from "../utils/constants";
import {useForm} from "../hooks/useForm";

export const LoginPage = () => {
    const dispatch = useDispatch()

    const [postLogin] = usePostLoginMutation();


    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const [isEmailError, setEmailError] = useState(false)
    const [isPasswordError, setPasswordError] = useState(false)

    const navigate = useNavigate();

    function toRegister() {
        navigate("/register")
    }

    function toForgotPassword() {
        navigate("/forgot-password")
    }

    const {values, handleChange } = useForm({});


    const loginUser = async form => {
        setEmailError(false)
        setPasswordError(false)
        if (values.email && values.password) {
            const response = await postLogin(form).unwrap();

            try {
                if (response.success) {
                    dispatch(setCredentials({ ...response, response }))
                    localStorage.setItem(REFRESH, response.refreshToken)
                    localStorage.setItem(ACCESS, response.accessToken)
                    if (from) {
                        navigate(from)
                    } else {
                        navigate("/")
                    }
                }
            } catch (e) {
                console.error(e)
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

    const login = (e) => {
        e.preventDefault()
        loginUser(values)
    }

    const disabled = () => {
        return values.email === '' || values.password === ''
    }


    return (
        <div className={styles.container}>
            <p className="text text_type_main-default">Вход</p>
            <form onSubmit={login}>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    error={isEmailError}
                    errorText={'Поле \"E-mail\" не может быть пустым'}
                    placeholder="E-mail"
                    extraClass="mt-6"
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    placeholder={'Пароль'}
                    name={'password'}
                    error={isPasswordError}
                    errorText={'Поле \"Пароль\" не может быть пустым'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Button htmlType="submit" type="primary" size="large" extraClass="mt-6" disabled={disabled()}>
                    Войти
                </Button>
            </form>
            <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Вы — новый пользователь?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toRegister()}>
                Зарегистрироваться</Button></div>
            <div className={`${styles.buttons} mt-6`}><p className="text text_type_main-default">Забыли пароль?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toForgotPassword()}>
                Восстановить пароль</Button></div>
        </div>
    );
}

export default LoginPage;