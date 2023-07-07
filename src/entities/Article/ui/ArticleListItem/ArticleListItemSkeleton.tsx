import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { Card } from 'shared/ui/Card/Card';

import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

export interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {
    if (view === ArticleView.LIST) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Skeleton
                            width={40}
                            height={40}
                            border="50%"
                            className={cls.avatar}
                        />
                        <Skeleton width={100} height={16} className={cls.username} />
                        <Skeleton className={cls.icon} width={80} height={16} />
                    </div>
                    <Skeleton width={350} height={30} className={cls.title} />
                    <Skeleton width="100%" height={300} className={cls.img} />
                    <div className={cls.footer}>
                        <Skeleton width={100} height={30} />
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <Skeleton width={330} height={280} border="10px" />
                <div className={cls.infoWrapper}>
                    <div className={cls.cardInfo} />
                    <Skeleton className={cls.skeletonText} width={200} height={30} />
                    <Skeleton className={cls.skeletonText} width={150} height={15} />
                </div>
            </Card>
        </div>
    );
});
