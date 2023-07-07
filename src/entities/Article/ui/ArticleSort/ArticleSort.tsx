import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReactNode, memo, useMemo } from 'react';
import { Select, SelectOptions, SelectProps } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types/sort';
import cls from './ArticleSort.module.scss';
import { ArticleSortField } from '../../model/types/article';

export interface ArticleSortProps {
    className?: string;
    sort: ArticleSortField
    order: SortOrder
    onChangeSort: (newSort: ArticleSortField) => void
    onChangeOrder: (newOrder: SortOrder) => void
}

export const ArticleSort = memo(({ className, sort, order, onChangeOrder, onChangeSort }: ArticleSortProps) => {
    const { t } = useTranslation('articles');

    const orderOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        { value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);

    const sortOptions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.DATE,
            content: t('дате'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию'),
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('просмотрам'),
        },
    ], [t]);

    return (
        <div className={classNames(cls.articleSort, {}, [className])}>
            <Select
                value={sort}
                onChange={onChangeSort}
                options={sortOptions}
                label={t('Сортировать по')}
            />
            <Select
                value={order}
                onChange={onChangeOrder}
                options={orderOptions}
                label={t('по')}
                className={cls.order}
            />
        </div>
    );
});
