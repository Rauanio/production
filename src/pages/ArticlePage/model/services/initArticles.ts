import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types/sort';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { getArticlesInited } from '../selectors/getArticles';
import { articlesPageActions } from '../slice/articlesPageSlice';
import { fetchArticles } from './fetchArticles';

export const initArticles = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticles',

    async (searchParams, { getState, dispatch }) => {
        const inited = getArticlesInited(getState());

        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('search');
            const typeFromUrl = searchParams.get('type') as ArticleType;

            if (orderFromUrl) {
                dispatch(articlesPageActions.setOrder(orderFromUrl));
            }

            if (sortFromUrl) {
                dispatch(articlesPageActions.setSort(sortFromUrl));
            }

            if (searchFromUrl) {
                dispatch(articlesPageActions.setSearch(searchFromUrl));
            }

            if (typeFromUrl) {
                dispatch(articlesPageActions.setType(typeFromUrl));
            }

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticles({}));
        }
    },
);
