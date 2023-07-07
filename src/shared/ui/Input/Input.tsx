import { classNames } from 'shared/lib/classNames/classNames';
import React, { InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number
    onChange?: (value: string) => void
    readonly?: boolean
    label?: string
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        label,
        readonly,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.InputWrapper, { [cls.readonly]: readonly }, [className])}>
            <div className={cls.label}>
                {label}
            </div>
            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                readOnly={readonly}
                {...otherProps}
            />
            <span className={cls.caret} />
        </div>
    );
});
