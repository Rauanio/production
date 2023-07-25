import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Wrapper } from 'widgets/Wrapper/Wrapper';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { Text, TextTheme } from 'shared/ui/Text/Text';

const ProfilePage = memo(() => {
    const { t } = useTranslation('profile');
    const { id } = useParams<{id: string}>();

    if (!id) {
        return <Text title={t('Ошибка в профиле')} theme={TextTheme.ERROR} />;
    }

    return (
        <Wrapper>
            <EditableProfileCard id={id} />
        </Wrapper>

    );
});

export default ProfilePage;
