import { ArticleDetails, ArticleList } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { useCallback } from 'react';
import { Wrapper } from 'widgets/Wrapper/Wrapper';
import { ArticleRecommendationList } from 'features/ArticleRecommendationList';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleRecommendationIsLoading } from '../../model/selectors/getArticleRecommendation';
import { fetchArticlesRecommendation } from '../../model/services/fetchArticlesRecommendation';
import {
    getArticleRecommendation,
} from '../../model/slice/articleDetailsRecommendationSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { getArticleCommentsIsLoading } from '../../model/selectors/getArticleComments';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

export interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDeatailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article_details');
    const { id } = useParams<{id: string}>();

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
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRecommendationList />
                <ArticleDetailsComments id={id} />
            </Wrapper>
        </DynamicModuleLoader>

    );
};

export default ArticleDetailsPage;
