import React, { memo } from 'react';
import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const ProfilePage = memo(() => {
    const reducers: ReducersList = {
        profile: profileReducer,
    };
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ProfileCard />
        </DynamicModuleLoader>

    );
});

export default ProfilePage;
