import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Button, ThemeButton } from '../Button/Button';

export interface LangSwitcherProps {
  className?: string;
  short?: boolean
}
export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <div className={classNames('', {}, [className])}>
            <Button theme={ThemeButton.CLEAR} onClick={toggle}>
                {t(short ? 'Сокращенный язык' : 'Язык')}
            </Button>
        </div>
    );
});
