import { createSlice } from "@reduxjs/toolkit";
const initialGameState = {
  currentGame: null,
  currentGameQuestions: null,
  gameisStared: false,
  currentQuestion: { question: null, correctAnswer: null },
  currentQuestionIndex: 0,
  questionsDispleyed: [],
};

const gameData = createSlice({
  name: "gameData",
  initialState: initialGameState,
  reducers: {
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
    },
    setCurrentGameQuestions: (state) => {
      const questions = state.currentGame.questions.sort(
        () => 0.5 - Math.random()
      );

      state.currentGameQuestions = questions;
      state.currentQuestion.question = state.currentGameQuestions[0];
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion.question = action.payload.question;
      state.currentQuestion.correctAnswer =
        action.payload.correctAnswer || null;
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
    setQuestionsDispleyed: (state, action) => {
      state.questionsDispleyed.push(action.payload);
    },
    setCorrectAnswer(state, action) {
      state.currentQuestion.correctAnswer = action.payload;
    },
  },
});

export const gameDataActions = gameData.actions;
export default gameData.reducer;
