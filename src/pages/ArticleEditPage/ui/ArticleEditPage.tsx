import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReactNode, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Wrapper } from 'widgets/Wrapper/Wrapper';

export interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const canEdit = Boolean(id);

    return (
        <Wrapper className={classNames('', {}, [className])}>
            {canEdit ? t(`Редактирование статьи с ID ${id}`) : t('Создание статьи') }
        </Wrapper>
    );
};

export default memo(ArticleEditPage);
