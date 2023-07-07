import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
    getArticlesHasMore,
    getArticlesIsLoading,
    getArticlesLimit,
    getArticlesPageNum } from '../selectors/getArticles';
import { articlesPageActions } from '../slice/articlesPageSlice';
import { fetchArticles } from './fetchArticles';

export interface fetchArticlesProps {
    page?: number
}

export const fetchNextArticles = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchNextArticles',
    async (_, { getState, dispatch }) => {
        const page = getArticlesPageNum(getState());
        const isLoading = getArticlesIsLoading(getState());
        const hasMore = getArticlesHasMore(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(fetchArticles({}));
        }
    },
);
