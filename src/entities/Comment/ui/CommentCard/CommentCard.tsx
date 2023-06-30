import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

export interface CommentCardProps {
    className?: string;
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.commentHeader}>
                    <Skeleton height={30} width={30} border="50%" />
                    <Skeleton className={cls.commentUsername} height={20} width={100} />
                </div>
                <Skeleton className={cls.text} height={50} width="100%" />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`}>
                <div className={cls.commentHeader}>
                    {comment.user.avatar
                        ? (
                            <Avatar
                                size={40}
                                src={comment.user.avatar}
                            />
                        ) : null}
                    <Text
                        text={comment.user.username}
                        className={cls.commentUsername}
                    />
                </div>
            </AppLink>

            <Text
                text={comment.text}
                className={cls.text}
            />
        </div>
    );
});
