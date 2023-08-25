import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import starIcon from 'shared/assets/icons/star.svg';
import { Icon } from '../Icon/Icon';
import cls from './StarRating.module.scss';

export interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount : number) => void
    selectedStars?: number
    size?: number
}

const starts = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, selectedStars = 0, size = 30 } = props;
    const [currentStarsCount, setCurrentStartCount] = React.useState(selectedStars);
    const [isSelected, setIsSelected] = React.useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStartCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStartCount(0);
        }
    };

    const onStarClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStartCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(cls.starRating, {}, [className])}>
            {starts.map((starNumber) => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [currentStarsCount >= starNumber ? cls.hovered : cls.normal],
                    )}
                    Svg={starIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onClick={onStarClick(starNumber)}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                />
            ))}
        </div>
    );
});
