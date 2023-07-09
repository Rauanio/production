import { ArticleDetails, ArticleList } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { useCallback } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import ArrowIcon from 'shared/assets/icons/arrow.svg';
import { Wrapper } from 'widgets/Wrapper/Wrapper';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleRecommendationIsLoading } from '../../model/selectors/getArticleRecommendation';
import { fetchArticlesRecommendation } from '../../model/services/fetchArticlesRecommendation';
import {
    articleDetailsRecommendationReducer,
    getArticleRecommendation,
} from '../../model/slice/articleDetailsRecommendationSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { getArticleCommentsIsLoading } from '../../model/selectors/getArticleComments';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

export interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDeatailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article_details');
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const recommendation = useSelector(getArticleRecommendation.selectAll);
    const isLoadingRecommendation = useSelector(getArticleRecommendationIsLoading);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const onBackToArticles = useCallback(() => {
        navigate(RoutePath.article);
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticlesRecommendation());
    });

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Wrapper className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={onBackToArticles}
                >
                    <Icon className={cls.backIcon} Svg={ArrowIcon} />
                </Button>
                <ArticleDetails id={id} />
                <Text
                    className={cls.recommendation}
                    title={t('Рекомендуем')}
                />
                <ArticleList
                    articles={recommendation}
                    isLoading={isLoadingRecommendation}
                    target="_blank"
                />
                <Text
                    title={t('Комментарий')}
                    className={cls.commentTitle}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={isLoading}
                    comments={comments}
                />
            </Wrapper>
        </DynamicModuleLoader>

    );
};

export default ArticleDetailsPage;
