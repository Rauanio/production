import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReactNode, memo, useCallback } from 'react';
import { RatingCard } from 'entities/Rating';
import { getUserAuthData } from 'entities/user';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './ArticleRating.module.scss';
import { useGetArticleRatingQuery, useRateArticleMutation } from '../api/articleRatingApi';

export interface ArticleRatingProps {
    className?: string;
    articleId: string
}

export const ArticleRating = memo(({ className, articleId }: ArticleRatingProps) => {
    const { t } = useTranslation('article_details');
    const userData = useSelector(getUserAuthData);
    const [rateArticleMutation] = useRateArticleMutation();
    const { data, isLoading } = useGetArticleRatingQuery({
        articleId,
        userId: userData?.id ?? '',
    });

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                articleId,
                rate: starsCount,
                userId: userData?.id ?? '',
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);

    if (isLoading) {
        return (
            <Skeleton width="100%" height={200} />
        );
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={cls.articleRating}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье')}
            hasFeedback
        />
    );
});
