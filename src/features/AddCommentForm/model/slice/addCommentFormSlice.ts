import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentFormSchema';

const initialState: AddCommentFormSchema = {

};

export const addCommentFormSlice = createSlice({
    name: 'addComment',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(loginByUsername.pending, (state) => {
    //         state.error = undefined;
    //         state.isLoading = true;
    //     });
    //     builder.addCase(loginByUsername.fulfilled, (state) => {
    //         state.isLoading = false;
    //     });
    //     builder.addCase(loginByUsername.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.payload;
    //     });
    // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
