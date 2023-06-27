import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import cls from './Code.module.scss';
import { Button, ThemeButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import CopyIcon from '../../assets/icons/copy.svg';

export interface CodeProps {
    className?: string;
    text: string
}
export const Code = memo(({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                theme={ThemeButton.CLEAR}
                className={cls.copyBtn}
                onClick={onCopy}
            >
                <Icon
                    Svg={CopyIcon}
                    className={cls.copyIcon}
                />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
});
