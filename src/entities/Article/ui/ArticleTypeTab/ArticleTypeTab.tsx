import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from '../../model/types/article';

export interface ArticleTypeTabProps {
    className?: string;
    value: ArticleType
    onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTab = memo(({ className, value, onChangeType }: ArticleTypeTabProps) => {
    const { t } = useTranslation('articles');

    const tabTypes = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('Все'),
        },
        {
            value: ArticleType.IT,
            content: t('Айти'),
        },
        {
            value: ArticleType.LIBRARY,
            content: t('Библиотеки'),
        },
        {
            value: ArticleType.TECHNOLOGY,
            content: t('Технологий'),
        },
    ], [t]);

    const onTabClick = useCallback((tab: TabItem) => {
        onChangeType(tab.value as ArticleType);
    }, [onChangeType]);

    return (
        <Tabs
            tabs={tabTypes}
            value={value}
            onTabClick={onTabClick}
            className={classNames('', {}, [className])}
        />
    );
});
