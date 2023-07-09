import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsError = (state: StateSchema) => {
    return state.articleDeatailsPage?.comments?.error;
};

export const getArticleCommentsIsLoading = (state: StateSchema) => {
    return state.articleDeatailsPage?.comments?.isLoading;
};
