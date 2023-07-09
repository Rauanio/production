import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { addQueryParams } from 'shared/lib/url/addQueryParams';
import {
    getArticlesLimit,
    getArticlesOrder,
    getArticlesPageNum,
    getArticlesSearch,
    getArticlesSort,
} from '../selectors/getArticles';

export interface fetchArticlesProps {
    replace?: boolean
}

export const fetchArticles = createAsyncThunk<Article[], fetchArticlesProps, ThunkConfig<string>>(
    'articlesPage/fetchArticles',
    async (props, { extra, rejectWithValue, getState }) => {
        const limit = getArticlesLimit(getState());
        const sort = getArticlesSort(getState());
        const order = getArticlesOrder(getState());
        const search = getArticlesSearch(getState());
        const page = getArticlesPageNum(getState());

        try {
            addQueryParams({
                order, sort, search,
            });
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    q: search,
                    _sort: sort,
                    _order: order,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
