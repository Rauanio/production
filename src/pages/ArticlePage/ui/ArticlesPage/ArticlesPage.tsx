import { memo, useCallback } from 'react';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { Wrapper } from 'widgets/Wrapper/Wrapper';
import { useSearchParams } from 'react-router-dom';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { initArticles } from '../../model/services/initArticles';
import { fetchNextArticles } from '../../model/services/fetchNextArticles';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticles(searchParams));
    });

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextArticles());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Wrapper onScrollEnd={onLoadNextPage}>
                <ArticlesPageFilters />
                <ArticleInfiniteList />
            </Wrapper>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlesPage);
