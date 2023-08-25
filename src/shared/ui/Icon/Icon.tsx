import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Icon.module.scss';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg, ...otherProps }: IconProps) => {
    return (
        <Svg className={classNames(cls.Icon, {}, [className])} {...otherProps} />
    );
});
