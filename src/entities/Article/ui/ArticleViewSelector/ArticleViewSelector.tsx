import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleView } from 'entities/Article/model/types/article';
import BlockIcon from 'shared/assets/icons/block-view.svg';
import ListIcon from 'shared/assets/icons/list-view.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';

export interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView
    onClickView?: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.BLOCK,
        icon: BlockIcon,
    },
    {
        view: ArticleView.LIST,
        icon: ListIcon,
    },
];

export const ArticleViewSelector = memo(({ className, view, onClickView }: ArticleViewSelectorProps) => {
    const onClick = (newView: ArticleView) => () => {
        onClickView?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    key={viewType.view}
                    theme={ThemeButton.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames(cls.icon, { [cls.selected]: viewType.view === view })}
                    />
                </Button>
            ))}
        </div>
    );
});
