import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { ArticleSort, ArticleSortField, ArticleTypeTab, ArticleView, ArticleViewSelector } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types/sort';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';
import { fetchArticles } from '../../model/services/fetchArticles';
import {
    getArticlesOrder,
    getArticlesSearch,
    getArticlesSort,
    getArticlesType,
    getArticlesView,
} from '../../model/selectors/getArticles';
import cls from './ArticlesPageFilters.module.scss';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';

export interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo(({ className }: ArticlesPageFiltersProps) => {
    const { t } = useTranslation('articles');
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesView);
    const sort = useSelector(getArticlesSort);
    const order = useSelector(getArticlesOrder);
    const search = useSelector(getArticlesSearch);
    const type = useSelector(getArticlesType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    return (
        <div className={classNames(cls.articlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSort
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector
                    view={view}
                    onClickView={onChangeView}
                />
            </div>
            <Input
                onChange={onChangeSearch}
                value={search}
                className={cls.input}
                placeholder={t('Поиск...')}
            />
            <ArticleTypeTab
                className={cls.tabs}
                onChangeType={onChangeType}
                value={type}
            />
        </div>
    );
});
