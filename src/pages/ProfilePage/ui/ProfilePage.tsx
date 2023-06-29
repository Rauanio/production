import {
    ProfileCard,
    ValidateProfileError,
    fetchProfileData,
    getProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    profileReducer,
} from 'entities/Profile';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useParams } from 'react-router-dom';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('profile');
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);
    const { id } = useParams<{id: string}>();

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const validateErrorTranslates = {
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Некорректное имя или фамилия'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.INCORRECT_CITY]: t('Некорректный город'),
        [ValidateProfileError.INCORRECT_USERNAME]: t('Некорректное имя пользователя'),
        [ValidateProfileError.INCORRECT_AVATAR]: t('Некорректная ссылка на изоброжение'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка'),
    };

    const onChangeName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ name: value || '' }));
    }, [dispatch]);

    const onChangeSurname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ surname: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        const validateAge = value?.replace(/\D+/gm, '');
        dispatch(profileActions.updateProfile({ age: Number(validateAge || 0) }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>

            {validateErrors?.length && validateErrors.map((err) => (
                <Text
                    key={err}
                    theme={TextTheme.ERROR}
                    text={validateErrorTranslates[err]}
                />
            ))}
            <ProfileCard
                data={formData}
                isLoading={isLoading}
                error={error}
                readonly={readonly}
                onChangeName={onChangeName}
                onChangeSurname={onChangeSurname}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                onChangeUsername={onChangeUsername}
                onChangeAvatar={onChangeAvatar}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
            />
            <ProfilePageHeader />
        </DynamicModuleLoader>

    );
});

export default ProfilePage;
