import cls from './Loader.module.scss';

export interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
    return (
        <div className={cls.spinner} />
    );
};
