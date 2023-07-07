import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOptions<T extends string> {
    value: T
    content: string
}

export interface SelectProps<T extends string> {
    className?: string;
    label?: string
    options?: SelectOptions<T>[]
    value?: T
    onChange?: (value: T) => void
    readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, label, options, value, onChange, readonly } = props;

    const optionsList = useMemo(() => {
        return options?.map((opt) => (
            <option
                value={opt.value}
                key={opt.value}
            >
                {opt.content}
            </option>
        ));
    }, [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && (
                <span className={cls.label}>
                    {label}
                </span>
            )}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
};
