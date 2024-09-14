import { createSlice } from "@reduxjs/toolkit";
const initialGameState = {
  currentGame: null,
  currentGameQuestions: null,
  gameisStared: false,
  currentQuestionIndex: 0,
  questionsDispleyed: [],
  currentMap: null,
};

const gameData = createSlice({
  name: "gameData",
  initialState: initialGameState,
  reducers: {
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
      const questions = state.currentGame.questionsData.sort(
        () => 0.5 - Math.random()
      );

      state.currentGameQuestions = questions;

      state.questionsDispleyed.push({
        question: questions[0],
        correctAnswer: null,
        questionIndex: 0,
      });
    },

    setGameIsStarted: (state, action) => {
      state.gameisStared = action.payload;
    },
    incrementCurrentQuestionIndex: (state) => {
      state.currentQuestionIndex++;
    },
    decrementCurrentQuestionIndex: (state) => {
      state.currentQuestionIndex--;
    },
    pushQuestionsDispleyed: (state, action) => {
      state.questionsDispleyed.push(action.payload);
      state.currentQuestionIndex++;
    },
    setAnswerState: (state, action) => {
      state.questionsDispleyed[state.currentQuestionIndex].correctAnswer =
        action.payload;
    },
    setCurrentMap: (state, action) => {
      state.currentMap = action.payload;
    },
    resetGame: () => initialGameState,
  },
});

export const gameDataActions = gameData.actions;
export default gameData.reducer;
