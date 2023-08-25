import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/AddCommentForm';
import { CommentList } from 'entities/Comment';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { getArticleCommentsIsLoading } from '../../model/selectors/getArticleComments';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsComments.module.scss';

export interface ArticleDetailsCommentsProps {
    className?: string;
    id: string
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {
    const { t } = useTranslation('article_details');
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    return (
        <div className={classNames(cls.articleDetailsComments, {}, [className])}>
            <Text
                title={t('Комментарий')}
                className={cls.commentTitle}
            />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList
                isLoading={isLoading}
                comments={comments}
            />
        </div>
    );
});
