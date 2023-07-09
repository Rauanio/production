import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { Wrapper } from 'widgets/Wrapper/Wrapper';
import { fetchNextArticles } from 'pages/ArticlePage/model/services/fetchNextArticles';
import { initArticles } from 'pages/ArticlePage/model/services/initArticles';
import { useSearchParams } from 'react-router-dom';
import {
    getArticlesError,
    getArticlesInited,
    getArticlesIsLoading,
    getArticlesView,
} from '../../model/selectors/getArticles';
import { articlesPageReducer, getArticle } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

export interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticle.selectAll);
    const error = useSelector(getArticlesError);
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticles(searchParams));
    });

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextArticles());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Wrapper
                onScrollEnd={onLoadNextPage}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </Wrapper>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlesPage);
