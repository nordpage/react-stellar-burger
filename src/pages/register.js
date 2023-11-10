import React, {useCallback, useState} from 'react';
import styles from "./inputs.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import {usePostRegisterMutation} from "../services/reducers/burgerApi";
import {setCredentials} from "../services/reducers/authSlice";
import {useDispatch} from "react-redux";
import {ACCESS, REFRESH} from "../utils/constants";
import {useForm} from "../hooks/useForm";

const RegisterPage = () => {
    const dispatch = useDispatch()

    const [postRegister] = usePostRegisterMutation();


    const {values, handleChange } = useForm({});


    const [isNameError, setNameError] = useState(false)
    const [isEmailError, setEmailError] = useState(false)
    const [isPasswordError, setPasswordError] = useState(false)

    const navigate = useNavigate();

    function toLogin() {
        navigate("/login")
    }

    const registerUser = async form => {
        setNameError(false)
        setEmailError(false)
        setPasswordError(false)
        if (form.name && form.email && form.password) {
            const response = await postRegister(form).unwrap();

            try {
                if (response.success) {
                    dispatch(setCredentials({ ...response, response }))
                    localStorage.setItem(REFRESH, response.refreshToken)
                    localStorage.setItem(ACCESS, response.accessToken)
                    navigate("/")
                }
            } catch (e) {
                console.error(e)
            }
        } else {
            if (form.name === '') {
                setNameError(true)
            }
            if (form.email === ''){
                setEmailError(true)
            }
            if (form.password === ''){
                setPasswordError(true)
            }
        }
    }

    let register = useCallback(
        e => {
            e.preventDefault()
            registerUser(values)
        },
        [values]
    )

    return(
        <div className={styles.container}>
            <p className="text text_type_main-default">Регистрация</p>
            <form onSubmit={register}>
                <Input
                    type={'text'}
                    onChange={handleChange}
                    value={values.name}
                    placeholder={'Имя'}
                    name={'name'}
                    error={isNameError}
                    errorText={'Поле \"Имя\" не может быть пустым'}
                    size={'default'}
                    extraClass="mt-6"
                />
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
                <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Уже зарегистрированы?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                Войти</Button></div>
        </div>
    );
}

export default RegisterPage;