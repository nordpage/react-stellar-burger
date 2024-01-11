import React, {useCallback } from 'react';
import styles from "./inputs.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {usePostResetMutation} from "../services/reducers/burgerApi";
import {useForm} from "../hooks/useForm";

function ResetPasswordPage() {

    const navigate = useNavigate();
    let location = useLocation();
    const [postReset] = usePostResetMutation();
    const {values, handleChange } = useForm({});


    const isHasAccess = useCallback(() => {
        return location.state && location.state.hasAccess !== null ? location.state.hasAccess : false;
    },[])

    function toLogin() {
        navigate("/login")
    }

    const disabled = () => {
        return values.password === '' || values.token === ''
    }

    async function resetRequest() {
        const response = await postReset(values).unwrap()
        try {
            if (response.success) {
                navigate('/')
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            {
                isHasAccess() ?
                    <div className={styles.container}>
                        <p className="text text_type_main-default">Восстановление пароля</p>
                        <form onSubmit={resetRequest}>
                            <PasswordInput
                                placeholder={'Введите новый пароль'}
                                name={'password'}
                                value={values.password || ''}
                                onChange={handleChange}
                                size={'default'}
                                extraClass="mt-6"
                            />
                            <Input type={'text'}
                                   placeholder={'Введите код из письма'}
                                   name={'token'}
                                   value={values.token || ''}
                                   onChange={handleChange}
                                   size={'default'}
                                   extraClass="mt-6"
                            />
                            <Button htmlType="submit" type="primary" size="large" extraClass="mt-6" disabled={disabled()}>
                                Сохранить
                            </Button>
                        </form>
                        <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Вспомнили пароль?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                            Войти</Button></div>
                </div> : <Navigate to="/404" replace />
            }
        </div>
    );
}

export default ResetPasswordPage;