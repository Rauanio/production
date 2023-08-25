import { Rating } from 'entities/Rating';
import { rtkApi } from 'shared/api/rtkApi';

interface getArticleRatingArgs {
    articleId: string,
    userId: string
}

interface rateArticleArgs {
    userId: string
    articleId: string
    rate: number
    feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], getArticleRatingArgs >({
            query: ({ articleId, userId }) => ({
                url: '/article-rating',
                params: {
                    articleId,
                    userId,
                },
            }),

        }),
        rateArticle: build.mutation<void, rateArticleArgs>({
            query: (args) => ({
                url: '/article-rating',
                method: 'POST',
                body: args,
            }),

        }),
    }),
});

export const { useGetArticleRatingQuery } = articleRatingApi;
export const { useRateArticleMutation } = articleRatingApi;
