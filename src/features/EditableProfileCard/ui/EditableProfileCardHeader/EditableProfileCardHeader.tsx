import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/user';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import cls from './EditableProfileCardHeader.module.scss';

export interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(({ className }: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);

    const canEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            {canEdit && (
                <div className={cls.btnsWrapper}>
                    {readonly ? (
                        <Button
                            theme={ThemeButton.CONTAINED}
                            className={cls.editBtn}
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <div className={cls.btns}>
                            <Button
                                theme={ThemeButton.CONTAINED}
                                className={cls.saveBtn}
                                onClick={onSave}
                            >
                                {t('Сохранить')}
                            </Button>
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                className={cls.editBtn}
                                onClick={onCancelEdit}
                            >
                                {t('Отменить')}
                            </Button>
                        </div>

                    )}
                </div>
            )}

        </div>
    );
});
