import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributes, ReactNode, memo } from 'react';
import cls from './Card.module.scss';

export enum CardTheme {
    DEFAULT = 'default',
    OUTLINED = 'outlined'
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode
    theme?: CardTheme
}

export const Card = memo(({ className, children, theme = CardTheme.DEFAULT, ...otherProps }: CardProps) => {
    const { t } = useTranslation();
    return (
        <div {...otherProps} className={classNames(cls.Card, {}, [className, cls[theme]])}>
            {children}
        </div>
    );
});
