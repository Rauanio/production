import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation('');

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                type="text"
                placeholder={t('Имя пользавателя')}
                className={cls.input}
            />
            <Input
                type="text"
                placeholder={t('Пароль')}
                className={cls.input}
            />
            <Button
                theme={ThemeButton.OUTLINE}
                className={cls.loginBtn}
            >
                {t('Войти')}
            </Button>
        </div>
    );
};
