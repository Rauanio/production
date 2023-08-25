import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/user';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Popup/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Popover } from 'shared/ui/Popup';
import { NotificationList } from 'entities/Notification';
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
                <div className={cls.links}>
                    <Popover
                        direction="bottom left"
                        trigger={(
                            <Button theme={ThemeButton.CLEAR}>
                                <Icon className={cls.icon} Svg={NotificationIcon} />
                            </Button>
                        )}
                    >
                        <NotificationList className={cls.notifications} />
                    </Popover>
                    <Dropdown
                        direction="bottom left"
                        className={cls.dropdown}
                        trigger={<Avatar size={50} src={authData.avatar} />}
                        items={[
                            {
                                content: t('Профиль'),
                                href: RoutePath.profile + authData.id,
                            },
                            {
                                content: t('Выйти'),
                                onClick: onLogout,
                            },
                        ]}
                    />
                </div>

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
