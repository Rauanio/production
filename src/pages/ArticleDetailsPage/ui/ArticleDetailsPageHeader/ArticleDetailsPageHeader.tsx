import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import ArrowIcon from 'shared/assets/icons/arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from '../../model/selectors/getArticleEdit';
import cls from './ArticleDetailsPageHeader.module.scss';

export interface ArticleDetailsPageHeaderProps {
    className?: string;

}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation('article_details');
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToArticles = useCallback(() => {
        navigate(RoutePath.article);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [navigate, article?.id]);

    return (
        <div className={classNames(cls.articleDetailsPageHeader, {}, [className])}>
            <Button
                theme={ThemeButton.CLEAR}
                onClick={onBackToArticles}
            >
                <Icon className={cls.backIcon} Svg={ArrowIcon} />
            </Button>
            {canEdit && (
                <Button
                    theme={ThemeButton.OUTLINE}
                    className={cls.editBtn}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </div>
    );
});
