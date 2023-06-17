import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_INVERTED = 'outlineInverted',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: string
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        children,
        className,
        theme = ThemeButton.OUTLINE,
        square,
        size = ButtonSize.M,
        disabled,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={classNames(
                cls.Button,
                { [cls.square]: square, [cls.disabled]: disabled },
                [className, cls[theme], cls[size]],
            )}
            {...otherProps}
        >
            {children}
        </button>
    );
});
