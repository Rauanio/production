import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Overlay.module.scss';

export interface OverlayProps {
    className?: string;
    close: () => void
}

export const Overlay = memo(({ className, close }: OverlayProps) => {
    return (
        <div onClick={close} className={classNames(cls.overlay, {}, [className])} />
    );
});
