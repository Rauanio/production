import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Wrapper } from 'widgets/Wrapper/Wrapper';

const AboutPage = memo(() => {
    const { t } = useTranslation('about');

    return (
        <Wrapper>
            {t('О сайте')}
        </Wrapper>
    );
});

export default AboutPage;
