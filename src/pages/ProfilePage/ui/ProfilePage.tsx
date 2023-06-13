import { profileReducer } from 'entities/Profile';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';

const ProfilePage = memo(() => {
    const reducers: ReducersList = {
        profile: profileReducer,
    };
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div>

                {t('Страница профиля')}
            </div>
        </DynamicModuleLoader>

    );
});

export default ProfilePage;
