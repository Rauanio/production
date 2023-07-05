import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/visibility.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import DotIcon from 'shared/assets/icons/dot.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './ArticleListItem.module.scss';
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

export interface ArticleListItemProps {
    className?: string;
    article: Article
    view: ArticleView
}

export const ArticleListItem = memo(({ className, article, view }: ArticleListItemProps) => {
    const { t } = useTranslation('articles');
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);

    const types = (
        <div className={cls.type}>
            <Icon Svg={DotIcon} className={cls.typeIcon} />
            <Text className={cls.types} text={article.type.join(', ')} />
        </div>
    );

    const views = (
        <>
            <Icon className={cls.icon} Svg={EyeIcon} />
            <Text className={cls.views} text={String(article.views)} />
        </>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar
                            size={40}
                            src={article.user.avatar}
                            className={cls.avatar}
                        />
                        <Text text={article.user.username} className={cls.username} />
                        <Icon className={cls.icon} Svg={CalendarIcon} />
                        <Text text={article.createdAt} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    <img className={cls.img} src={article.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <Button onClick={onOpenArticle}>{t('Читать дальше')}</Button>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card onClick={onOpenArticle} className={cls.card}>
                <img
                    src={article.img}
                    alt={article.title}
                    className={cls.img}
                />
                <div className={cls.infoWrapper}>
                    <div className={cls.cardInfo}>
                        {types}
                        {views}
                    </div>
                    <Text className={cls.title} title={article.title} />
                    <Text text={article.subtitle} />
                </div>

            </Card>
        </div>
    );
});
