import React, {useCallback, useEffect} from 'react';
import AppHeader from "../components/header/appHeader";
import styles from "./inputs.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

function ResetPasswordPage(props) {

    const navigate = useNavigate();
    let location = useLocation();
    const prevRoute = useLocation();

    const isHasAccess = useCallback(() => {
        return location.state && location.state.hasAccess !== null ? location.state.hasAccess : false;
    },[])

    function toLogin() {
        navigate("/login")
    }

    return (
        <div>
            {
                isHasAccess() ? <div>
                    <AppHeader/>
                    <div className={styles.container}>
                        <p className="text text_type_main-default">Восстановление пароля</p>
                        <Input
                            type={'password'}
                            placeholder={'Введите новый пароль'}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mt-6"
                        />
                        <Input type={'text'}
                               placeholder={'Введите код из письма'}
                               name={'name'}
                               error={false}
                               errorText={'Ошибка'}
                               size={'default'}
                               extraClass="mt-6"
                        />
                        <Button htmlType="button" type="primary" size="large" extraClass="mt-6">
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