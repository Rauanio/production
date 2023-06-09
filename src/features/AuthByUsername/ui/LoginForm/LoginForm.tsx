import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSucces: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSucces }: LoginFormProps) => {
    const { t } = useTranslation('');
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSucces();
        }
    }, [onSucces, dispatch, username, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text className={cls.title} title={t('Форма авторизаций')} />
                {error && <Text text={t('Ошибка при авторизаций')} theme={TextTheme.ERROR} />}
                <label>
                    {t('Имя пользавателя')}
                    <Input
                        type="text"
                        placeholder={t('Имя пользавателя')}
                        className={cls.input}
                        onChange={onChangeUsername}
                        value={username}
                    />
                </label>
                <label>
                    {t('Пароль')}
                    <Input
                        type="text"
                        placeholder={t('Пароль')}
                        className={cls.input}
                        onChange={onChangePassword}
                        value={password}
                    />
                </label>
                <Button
                    theme={ThemeButton.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>

    );
});

export default LoginForm;
