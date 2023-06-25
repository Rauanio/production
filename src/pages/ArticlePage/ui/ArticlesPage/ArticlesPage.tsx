import React from 'react';
import { useTranslation } from 'react-i18next';

const ArticlesPage = () => {
    const { t } = useTranslation('article');

    return (
        <div>{t('ArticlePage')}</div>
    );
};

export default ArticlesPage;
