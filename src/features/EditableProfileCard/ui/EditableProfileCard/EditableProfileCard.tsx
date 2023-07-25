import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { ProfileCard } from 'entities/Profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { ValidateProfileError } from '../../model/types/EditableProfileCardSchema';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

export interface EditableProfileCardProps {
    id: string
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo(({ id }: EditableProfileCardProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

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
        <DynamicModuleLoader reducers={reducers}>
            {validateErrors?.length && validateErrors.map((err: ValidateProfileError) => (
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
            <EditableProfileCardHeader />
        </DynamicModuleLoader>

    );
});
