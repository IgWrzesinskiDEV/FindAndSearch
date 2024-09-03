import { createSlice } from "@reduxjs/toolkit";

const initialNewGameState = {
  newGameQuestions: [],
};

const newGameData = createSlice({
  name: "newGameData",
  initialState: initialNewGameState,
  reducers: {
    pushNewGameQuestion(state, action) {
      state.newGameQuestions.push(action.payload);
    },
    deleteNewGameQuestion(state, action) {
      state.newGameQuestions = state.newGameQuestions.filter(
        (question) => question.id !== action.payload
      );
    },
    editNewGameQuestion(state, action) {
      const index = state.newGameQuestions.findIndex(
        (question) => question.id === action.payload.id
      );
      state.newGameQuestions[index] = action.payload;
    },
  },
});

export const newGameDataActions = newGameData.actions;
export default newGameData.reducer;
