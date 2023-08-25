import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import { rtkApi } from 'shared/api/rtkApi';
import cls from './ArticleRecommendationList.module.scss';

export interface ArticleRecommendationListProps {
    className?: string;
}

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendations: build.query({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetArticleRecommendationsQuery } = recommendationsApi;

export const ArticleRecommendationList = memo(({ className }: ArticleRecommendationListProps) => {
    const { t } = useTranslation('article_details');
    const { data: articles, isLoading, error } = useGetArticleRecommendationsQuery(3);

    // console.log(data);
    if (error) {
        return null;
    }

    return (
        <div className={classNames(cls.articleRecommendationList, {}, [className])}>
            <Text
                className={cls.recommendation}
                title={t('Рекомендуем')}
            />
            <ArticleList
                articles={articles || []}
                isLoading={isLoading}
                target="_blank"
            />
        </div>
    );
});
