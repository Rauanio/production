import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributes, ReactNode, memo } from 'react';
import cls from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode
}
export const Card = memo(({ className, children, ...otherProps }: CardProps) => {
    const { t } = useTranslation();
    return (
        <div {...otherProps} className={classNames(cls.Card, {}, [className])}>
            {children}
        </div>
    );
});
