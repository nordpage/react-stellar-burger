import React, {useState} from 'react';
import styles from "./inputs.module.css"
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate } from "react-router-dom";
import {usePostLoginMutation} from "../services/reducers/burgerApi";
import {useDispatch} from "react-redux";
import {setCredentials} from "../services/reducers/authSlice";
import {ACCESS, REFRESH} from "../utils/constants";

export const LoginPage = () => {
    const dispatch = useDispatch()

    const [postLogin] = usePostLoginMutation();
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

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
        loginUser(form)
    }


    return (
        <div className={styles.container}>
            <p className="text text_type_main-default">Вход</p>
            <form onSubmit={login}>
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
                <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
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