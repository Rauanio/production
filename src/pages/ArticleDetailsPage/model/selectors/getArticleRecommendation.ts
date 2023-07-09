import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationError = (state: StateSchema) => {
    return state.articleDeatailsPage?.recommendations.error;
};

export const getArticleRecommendationIsLoading = (state: StateSchema) => {
    return state.articleDeatailsPage?.recommendations?.isLoading;
};
