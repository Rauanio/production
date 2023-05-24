import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { useTranslation } from 'react-i18next';
import cls from './Sidebar.module.scss';

export interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className={classNames(
            cls.Sidebar,
            { [cls.collapsed]: collapsed },
            [className],
        )}
        >
            <button
                type="button"
                onClick={onToggle}
            >
                {t('Активировать')}
            </button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
