import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/user';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss';

export interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
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
                <AppLink
                    to={RoutePath.article_create}
                    className={cls.createBtn}
                >
                    <Button
                        theme={ThemeButton.OUTLINE}
                    >
                        {t('Создать')}
                    </Button>
                </AppLink>
                <Button
                    theme={ThemeButton.OUTLINE_RED}
                    onClick={onLogout}
                    className={cls.logoutBtn}
                >
                    {t('Выйти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ThemeButton.OUTLINE}
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
});
