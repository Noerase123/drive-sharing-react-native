import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';

type TDialog = {
  isVisible: boolean;
  title: string;
  color?: string;
  description: string;
};

const initialState = {
  isVisible: false,
  title: '',
  description: '',
  color: '',
} as TDialog;

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setDialog(state: TDialog, action: PayloadAction<TDialog>) {
      return {
        ...state,
        ...action.payload,
        isVisible: true,
      };
    },
    removeDialog() {
      return initialState;
    },
  },
});

export const {setDialog, removeDialog} = dialogSlice.actions;
export default dialogSlice.reducer;

export const getDialog = (state: RootState) => state.dialog;
