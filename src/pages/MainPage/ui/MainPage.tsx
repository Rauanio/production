import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <div>
            {t('Главная')}
        </div>
    );
});

export default MainPage;
