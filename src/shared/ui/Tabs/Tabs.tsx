import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
    value: string
    content: ReactNode
}

export interface TabsProps {
    className?: string;
    tabs: TabItem[]
    onTabClick: (tab: TabItem) => void
    value: string
}

export const Tabs = memo(({ className, tabs, onTabClick, value }: TabsProps) => {
    const clickHandler = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab);
        };
    }, [onTabClick]);

    return (
        <div className={classNames(cls.tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={tab.value === value ? CardTheme.OUTLINED : CardTheme.DEFAULT}
                    key={tab.value}
                    onClick={clickHandler(tab)}
                    className={cls.tab}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
