import React from 'react';
import styles from "./inputs.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {usePostForgotMutation} from "../services/reducers/burgerApi";
import {useForm} from "../hooks/useForm";

export const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const [postForgot] = usePostForgotMutation();
    const {values, handleChange } = useForm({});


    function toLogin() {
        navigate("/login")
    }

    function toReset() {
        navigate("/reset-password", {
            replace: true,
            state: { hasAccess: true }
        })
    }

    async function forgotRequest() {
        const response = await postForgot(values).unwrap();
        try {
            if (response.success) {
                toReset()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={styles.container}>
            <p className="text text_type_main-default">Восстановление пароля</p>
            <form onSubmit={forgotRequest}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    value={values.email}
                    onChange={handleChange}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Button htmlType="submit" type="primary" size="large" extraClass="mt-6" disabled={values.email === ''}>
                    Восстановить
                </Button>
            </form>
            <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Вспомнили пароль?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                Войти</Button></div>
        </div>
    );
}

export default ForgotPasswordPage;