import { createSlice } from "@reduxjs/toolkit";

const initialNewGameState = {
  newGameQuestions: [],
  activeStep: 0,
  subbmitedQuestionErors: {
    questionText: false,
    answer: false,
    polygonsCords: false,
  },
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
    resetNewGameQuestions(state) {
      state.newGameQuestions = [];
    },
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },
    setSubbmitedQuestionErors(state, action) {
      state.subbmitedQuestionErors = {
        ...state.subbmitedQuestionErors,
        ...action.payload,
      };
    },
    onCloseModalResets(state) {
      state.activeStep = 0;
      state.subbmitedQuestionErors = {
        questionText: false,
        answer: false,
        polygonsCords: false,
      };
    },
  },
});

export const newGameDataActions = newGameData.actions;
export default newGameData.reducer;
