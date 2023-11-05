import React, {useEffect, useState} from 'react';
import styles from './user-data.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useGetUserDataQuery, useUpdateUserDataMutation} from "../services/reducers/userApiSlice";

function UserDataPage() {


    const [user, setUser] = useState({ name: null, email: null });

    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPass, setEditPass] = useState(false)
    const [postUpdateUser] = useUpdateUserDataMutation()

    const {
        data = {},
        isError,
        error,
        isSuccess
    } = useGetUserDataQuery();


    useEffect( () => {
        if (isSuccess && data !== undefined) {
            setUser(data.user)
        } else if (isError) {

        }
    }, [data]);

    async function onSave() {
        const response = await postUpdateUser(user).unwrap();
        try {
            if (response.success) {
                setUser(response.user)
                disableInputs()
            }
        } catch (e) {
            console.error(e)
        }

    }

    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const disableInputs = () => {
        setEditName(false)
        setEditEmail(false)
        setEditPass(false)
    }


    return (
        <div className={styles.container}>
            <Input
                type={"text"}
                placeholder={'Имя'}
                icon={"EditIcon"}
                disabled={!editName}
                name={'name'}
                onIconClick={() => setEditName(true)}
                onChange={onChange}
                value={user.name}
                defaultValue=""
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <Input
                type={"email"}
                placeholder={'Логин'}
                icon={"EditIcon"}
                disabled={!editEmail}
                onIconClick={() => setEditEmail(true)}
                name={'login'}
                onChange={onChange}
                value={user.email}
                defaultValue=""
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <Input
                type={"password"}
                placeholder={'Пароль'}
                icon={'EditIcon'}
                name={'password'}
                disabled={!editPass}
                onIconClick={() => setEditPass(true)}
                value="******"
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            {(editName || editEmail || editPass) && <div className={styles.edit}>
                <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={disableInputs}>Отмена</Button>
                <Button htmlType="button" type="primary" size="medium" onClick={onSave}>
                    Сохранить
                </Button>
            </div>}
        </div>
    );
}

export default UserDataPage;