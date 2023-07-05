import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SaveScrollSchema } from '../types/SaveScrollSchema';

const initialState: SaveScrollSchema = {
    scroll: {},
};

export const SaveScrollSlice = createSlice({
    name: 'SaveScroll',
    initialState,
    reducers: {
        setScrollPosition: (state, action: PayloadAction<{path: string, position: number}>) => {
            state.scroll[action.payload.path] = action.payload.position;
        },
    },
});

export const { actions: SaveScrollActions } = SaveScrollSlice;
export const { reducer: SaveScrollReducer } = SaveScrollSlice;
