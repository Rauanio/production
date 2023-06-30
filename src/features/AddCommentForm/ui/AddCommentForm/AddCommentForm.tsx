import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import { getCommentFormError, getCommentFormText } from '../../model/selectors/getCommentForm';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const text = useSelector(getCommentFormText);
    const error = useSelector(getCommentFormError);

    const onChangeCommentText = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const sendCommentHandler = useCallback(() => {
        onSendComment(text || '');
        onChangeCommentText('');
    }, [onChangeCommentText, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input
                    value={text}
                    onChange={onChangeCommentText}
                    placeholder={t('Введите текст')}
                />
                <Button
                    onClick={sendCommentHandler}
                    className={cls.sendBtn}
                >
                    {t('Отправить')}

                </Button>
            </div>
        </DynamicModuleLoader>

    );
});

export default AddCommentForm;
