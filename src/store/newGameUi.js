import { createSlice } from "@reduxjs/toolkit";

const initialNewGameUiState = {
  isNewQuestionSelected: false,
};

const newGameUi = createSlice({
  name: "newGameUi",
  initialState: initialNewGameUiState,
  reducers: {
    setIsNewQuestionSelected(state, action) {
      state.isNewQuestionSelected = action.payload;
    },
  },
});

export const newGameUiActions = newGameUi.actions;
export default newGameUi.reducer;
