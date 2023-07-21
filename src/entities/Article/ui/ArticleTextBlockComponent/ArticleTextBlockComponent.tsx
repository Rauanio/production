import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleBlock, ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

export interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock
}
export const ArticleTextBlockComponent = ({ className, block }: ArticleTextBlockComponentProps) => {
    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            { block.title && (
                <Text
                    size={TextSize.L}
                    className={cls.title}
                    title={block.title}

                />
            )}
            {block.paragraphs.map((paragraph, index) => (
                <Text
                    key={index}
                    text={paragraph}
                    className={cls.paragraph}
                />
            ))}
        </div>
    );
};
