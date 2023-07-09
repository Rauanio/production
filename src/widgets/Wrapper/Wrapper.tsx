import { classNames } from 'shared/lib/classNames/classNames';
import { MutableRefObject, ReactNode, memo, useRef } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import cls from './Wrapper.module.scss';

export interface WrapperProps {
    className?: string;
    children: ReactNode
    onScrollEnd?: () => void
}

export const Wrapper = memo(({ className, children, onScrollEnd }: WrapperProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.wrapper, {}, [className])}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
