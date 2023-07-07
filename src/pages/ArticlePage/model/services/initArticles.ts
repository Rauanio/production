import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesInited } from '../selectors/getArticles';
import { articlesPageActions } from '../slice/articlesPageSlice';
import { fetchArticles } from './fetchArticles';

export const initArticles = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initArticles',

    async (_, { getState, dispatch }) => {
        const inited = getArticlesInited(getState());

        if (!inited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticles({}));
        }
    },
);
