import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/user';
import cls from './Navbar.module.scss';

export interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setAuthModal] = React.useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const onModalClose = useCallback(() => {
        setAuthModal(false);
    }, []);

    const onModalOpen = useCallback(() => {
        setAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.onLogout());
    }, [dispatch]);

    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    theme={ThemeButton.OUTLINE_INVERTED}
                    onClick={onLogout}
                    className={cls.links}
                >
                    {t('Выйти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ThemeButton.OUTLINE_INVERTED}
                onClick={onModalOpen}
                className={cls.links}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onModalClose}
                />
            )}
        </div>
    );
};
