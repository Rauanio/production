import { classNames } from 'shared/lib/classNames/classNames';
import { Code } from 'shared/ui/Code/Code';
import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';

export interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock
}
export const ArticleCodeBlockComponent = ({ className, block }: ArticleCodeBlockComponentProps) => {
    return (
        <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    );
};
