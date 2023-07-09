import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReactNode, memo } from 'react';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';

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
    return (
        <div className={classNames(cls.tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card key={tab.value}>
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
