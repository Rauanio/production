import { RatingCard } from 'entities/Rating/ui/RatingCard';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import { Wrapper } from 'widgets/Wrapper/Wrapper';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            {t('Главная')}
            <RatingCard feedbackTitle="Напишите свой отзыв о статье" hasFeedback title="Оцените статью" />
        </Wrapper>
    );
});

export default MainPage;
