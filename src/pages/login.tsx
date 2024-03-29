import React, {FormEvent, } from 'react';
import styles from "./inputs.module.css"
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate } from "react-router-dom";
import {usePostLoginMutation} from "../services/reducers/burgerApi";
import {setCredentials} from "../services/reducers/authSlice";
import {ACCESS, REFRESH} from "../utils/constants";
import {useForm} from "../hooks/useForm";
import {Inputs} from "../utils/types";
import {useAppDispatch} from "../hooks/hooks";

export const LoginPage = () => {
    const dispatch = useAppDispatch()

    const [postLogin] = usePostLoginMutation();


    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const navigate = useNavigate();

    function toRegister() {
        navigate("/register")
    }

    function toForgotPassword() {
        navigate("/forgot-password")
    }

    const {values, handleChange } = useForm({ });


    const loginUser = async (form: Inputs) => {
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
        }
    }

    const login = (e: FormEvent) => {
        e.preventDefault()
        loginUser(values)
    }

    const disabled = () => {
        return values.email === '' || values.password === ''
    }


    return (
        <div className={styles.container}>
            <p className="text text_type_main-default">Вход</p>
            <form onSubmit={(e) => login(e)}>
                <EmailInput
                    onChange={handleChange}
                    value={values.email || ''}
                    name={'email'}
                    placeholder="E-mail"
                    extraClass="mt-6"
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password  || ''}
                    placeholder={'Пароль'}
                    name={'password'}
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