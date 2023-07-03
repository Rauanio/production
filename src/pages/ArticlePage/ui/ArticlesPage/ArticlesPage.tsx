import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { articleDetailsActions } from 'entities/Article/model/slice/articleDetailsSlice';
import {
    getArticlesError,
    getArticlesIsLoading,
    getArticlesView,
} from '../../model/selectors/getArticles';
import { fetchArticles } from '../../model/services/fetchArticles';
import { articlesPageActions, articlesPageReducer, getArticle } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

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

    useInitialEffect(() => {
        dispatch(fetchArticles());
        dispatch(articlesPageActions.initView());
    });

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onClickView={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlesPage);
