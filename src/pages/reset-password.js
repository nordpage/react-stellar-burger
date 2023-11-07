import React, {useCallback, useState} from 'react';
import AppHeader from "../components/header/appHeader";
import styles from "./inputs.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {usePostResetMutation} from "../services/reducers/burgerApi";

function ResetPasswordPage() {

    const navigate = useNavigate();
    let location = useLocation();
    const [form, setValue] = useState({password: '', token: ''})
    const [postReset] = usePostResetMutation();

    const isHasAccess = useCallback(() => {
        return location.state && location.state.hasAccess !== null ? location.state.hasAccess : false;
    },[])

    function toLogin() {
        navigate("/login")
    }

    const disabled = () => {
        return form.password === '' || form.token === ''
    }

    async function resetRequest() {
        const response = await postReset(form).unwrap()
        try {
            if (response.success) {
                navigate('/')
            }
        } catch (e) {
            console.error(e)
        }
    }

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {
                isHasAccess() ? <div>
                    <AppHeader/>
                    <div className={styles.container}>
                        <p className="text text_type_main-default">Восстановление пароля</p>
                        <form>
                            <PasswordInput
                                placeholder={'Введите новый пароль'}
                                name={'password'}
                                value={form.password}
                                onChange={onChange}
                                error={false}
                                errorText={'Ошибка'}
                                size={'default'}
                                extraClass="mt-6"
                            />
                            <Input type={'text'}
                                   placeholder={'Введите код из письма'}
                                   name={'token'}
                                   value={form.token}
                                   onChange={onChange}
                                   error={false}
                                   errorText={'Ошибка'}
                                   size={'default'}
                                   extraClass="mt-6"
                            />
                        </form>
                        <Button htmlType="button" type="primary" size="large" extraClass="mt-6" disabled={disabled()} onClick={resetRequest}>
                            Сохранить
                        </Button>
                        <div className={`${styles.buttons} mt-20`}><p className="text text_type_main-default">Вспомнили пароль?</p> <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                            Войти</Button></div>
                    </div>
                </div> : <Navigate to="/404" replace />
            }
        </div>
    );
}

export default ResetPasswordPage;