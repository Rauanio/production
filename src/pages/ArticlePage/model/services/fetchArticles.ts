import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleType } from 'entities/Article';
import { addQueryParams } from 'shared/lib/url/addQueryParams';
import {
    getArticlesLimit,
    getArticlesOrder,
    getArticlesPageNum,
    getArticlesSearch,
    getArticlesSort,
    getArticlesType,
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
        const type = getArticlesType(getState());

        try {
            addQueryParams({
                order, sort, search, type,
            });
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    q: search,
                    _sort: sort,
                    _order: order,
                    type: type === ArticleType.ALL ? undefined : type,
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
