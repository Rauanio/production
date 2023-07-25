import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Wrapper } from 'widgets/Wrapper/Wrapper';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            {t('Главная')}
        </Wrapper>
    );
});

export default MainPage;
