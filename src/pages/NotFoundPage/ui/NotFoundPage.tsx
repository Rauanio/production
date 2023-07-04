import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Wrapper } from 'shared/ui/Wrapper/Wrapper';
import cls from './NotFoundPage.module.scss';

export interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();

    return (
        <Wrapper className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </Wrapper>
    );
});
