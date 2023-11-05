import React, {useState} from 'react';
import AppHeader from "../components/header/appHeader";
import styles from "./inputs.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {usePostResetMutation} from "../services/reducers/burgerApi";

export const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [postReset] = usePostResetMutation();

    function toLogin() {
        navigate("/login")
    }

    function toReset() {
        navigate("/reset-password", {
            replace: true,
            state: { hasAccess: true }
        })
    }

    async function resetRequest() {
        const response = await postReset(email).unwrap();
        try {
            if (response.success) {
                toReset()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <AppHeader/>
            <div className={styles.container}>
                <p className="text text_type_main-default">Восстановление пароля</p>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={(e) => setEmail(e.target.value)}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={resetRequest} disabled={email === null}>
                    Восстановить
                </Button>
                <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Вспомнили пароль?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                    Войти</Button></div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;