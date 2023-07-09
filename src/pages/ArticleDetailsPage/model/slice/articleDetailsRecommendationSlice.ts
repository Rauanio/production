import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsRecommendationSchema } from '../types/ArticleDetailsRecommendationSchema';
import { fetchArticlesRecommendation } from '../services/fetchArticlesRecommendation';

const recommendationAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecommendation = recommendationAdapter.getSelectors<StateSchema>(
    (state) => state.articleDeatailsPage?.recommendations || recommendationAdapter.getInitialState(),
);

export const articleDetailsRecommendationSlice = createSlice({
    name: 'articleDetailsRecommendation',
    initialState: recommendationAdapter.getInitialState<ArticleDetailsRecommendationSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesRecommendation.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesRecommendation.fulfilled, (
                state,
                action: PayloadAction<Article[]>,
            ) => {
                state.isLoading = false;
                recommendationAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticlesRecommendation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailsRecommendationActions } = articleDetailsRecommendationSlice;
export const { reducer: articleDetailsRecommendationReducer } = articleDetailsRecommendationSlice;
