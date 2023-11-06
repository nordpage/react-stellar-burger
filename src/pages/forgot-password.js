import React, {useState} from 'react';
import AppHeader from "../components/header/appHeader";
import styles from "./inputs.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {usePostResetMutation} from "../services/reducers/burgerApi";

export const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const [form, setValue] = useState({email:''})
    const [postReset] = usePostResetMutation();


    const onChange = e => {
        setValue({ ...form, email: e.target.value });
    };

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
        const response = await postReset(form).unwrap();
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
                    value={form.email}
                    onChange={onChange}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={resetRequest} disabled={form.email === ''}>
                    Восстановить
                </Button>
                <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Вспомнили пароль?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                    Войти</Button></div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;