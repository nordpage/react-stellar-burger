import React, {useCallback, useState} from 'react';
import styles from "./inputs.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import {usePostRegisterMutation} from "../services/reducers/burgerApi";
import {setCredentials} from "../services/reducers/authSlice";
import {useDispatch} from "react-redux";
import {REFRESH} from "../utils/constants";

const RegisterPage = () => {
    const dispatch = useDispatch()

    const [postRegister] = usePostRegisterMutation();
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };


    const [form, setValue] = useState({ name: '', email: '', password: '' });


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
            registerUser(form)
        },
        [form]
    )

    return(
        <div className={styles.container}>
            <p className="text text_type_main-default">Регистрация</p>
            <form>
                <Input
                    type={'text'}
                    onChange={onChange}
                    value={form.name}
                    placeholder={'Имя'}
                    name={'name'}
                    error={isNameError}
                    errorText={'Поле \"Имя\" не может быть пустым'}
                    size={'default'}
                    extraClass="mt-6"
                />
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
            <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={register}>
                Зарегистрироваться
            </Button>
            <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Уже зарегистрированы?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                Войти</Button></div>
        </div>
    );
}

export default RegisterPage;