import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { addCommentFormReducer } from 'features/AddCommentForm/model/slice/addCommentFormSlice';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'features/EditableProfileCard/model/slice/profileSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader';

const defualtAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    articleDeatailsPage: articleDetailsPageReducer,
    addCommentForm: addCommentFormReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defualtAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
