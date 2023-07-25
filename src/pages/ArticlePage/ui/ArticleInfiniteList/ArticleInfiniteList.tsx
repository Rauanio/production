import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList } from 'entities/Article';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getArticle } from '../../model/slice/articlesPageSlice';
import { getArticlesError, getArticlesIsLoading, getArticlesView } from '../../model/selectors/getArticles';

export const ArticleInfiniteList = memo(() => {
    const { t } = useTranslation('articles');
    const articles = useSelector(getArticle.selectAll);
    const error = useSelector(getArticlesError);
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);

    if (error) {
        return <Text theme={TextTheme.ERROR} title={t('Статьи не найдены')} />;
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
        />
    );
});
