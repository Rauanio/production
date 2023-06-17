import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import React, { memo } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = memo(() => {
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
