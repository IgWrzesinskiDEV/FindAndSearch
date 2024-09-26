import { createSlice } from "@reduxjs/toolkit";
const initialGameState = {
  currentGame: null,
  currentGameQuestions: null,
  gameisStared: false,
  currentQuestionIndex: 0,
  questionsDispleyed: [],
  currentMap: null,
  isCheckingAnswer: false,
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
      localStorage.setItem("questionsDisplayed", JSON.stringify(state.questionsDispleyed));
    },
    setCurrentGameFromLS: (state, action) => {
      state.currentGame = action.payload.currentGame;
      state.currentGameQuestions = state.currentGame.questionsData;
      state.questionsDispleyed = action.payload.questionsDispleyed;
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
      localStorage.setItem("questionsDisplayed", JSON.stringify(state.questionsDispleyed));

      state.currentQuestionIndex++;
    },
    setAnswerState: (state, action) => {
      state.questionsDispleyed[state.currentQuestionIndex].correctAnswer =
        action.payload;
      localStorage.setItem("questionsDisplayed", JSON.stringify(state.questionsDispleyed));
    },
    setCurrentMap: (state, action) => {
      state.currentMap = action.payload;
    },
    setIsCheckingAnswer: (state, action) => {
      state.isCheckingAnswer = action.payload;
    },
    resetGame: () => initialGameState,
  },
});

export const gameDataActions = gameData.actions;
export default gameData.reducer;
