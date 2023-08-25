import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Card } from 'shared/ui/Card/Card';
import { Text } from 'shared/ui/Text/Text';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import { Modal } from 'shared/ui/Modal/Modal';
import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './RatingCard.module.scss';

export interface RatingCardProps {
    className?: string;
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
    rate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
    const { className, feedbackTitle, hasFeedback, onAccept, onCancel, title, rate = 0 } = props;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [starsCount, setStarsCount] = React.useState(rate);
    const [feedback, setFeedback] = React.useState('');
    const { t } = useTranslation('article_details');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const handleAccept = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    return (
        <Card className={classNames(cls.ratingCard, {}, [className])}>
            <Text title={starsCount ? t('Спасибо за оценку!') : title} />
            <StarRating selectedStars={starsCount} className={cls.stars} onSelect={onSelectStars} size={40} />
            <Modal isOpen={isModalOpen} lazy>
                <Text title={feedbackTitle} className={cls.feedback} />
                <Input value={feedback} onChange={setFeedback} placeholder={t('Напишите отзыв')} />
                <div className={cls.btns}>
                    <Button onClick={handleCancel} theme={ThemeButton.OUTLINE_RED}>
                        {t('Отменить')}
                    </Button>
                    <Button onClick={handleAccept} theme={ThemeButton.OUTLINE}>
                        {t('Отправить')}
                    </Button>
                </div>
            </Modal>

        </Card>
    );
});
