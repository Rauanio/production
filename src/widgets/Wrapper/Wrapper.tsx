import { classNames } from 'shared/lib/classNames/classNames';
import { MutableRefObject, ReactNode, UIEvent, memo, useRef } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { SaveScrollActions, getScrollByPath } from 'features/SaveScroll';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import cls from './Wrapper.module.scss';

export interface WrapperProps {
    className?: string;
    children: ReactNode
    onScrollEnd?: () => void
}

export const Wrapper = memo(({ className, children, onScrollEnd, ...otherProps }: WrapperProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(SaveScrollActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 500);

    return (
        <section
            onScroll={onScroll}
            ref={wrapperRef}
            {...otherProps}
            className={classNames(cls.wrapper, {}, [className])}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </section>
    );
});
