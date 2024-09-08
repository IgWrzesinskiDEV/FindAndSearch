import { createSlice } from "@reduxjs/toolkit";
const initialGameState = {
  currentGame: null,
  currentGameQuestions: null,
  gameisStared: false,
  currentQuestion: { question: null, correctAnswer: null },
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
    },
    setCurrentGameQuestions: (state) => {
      const questions = state.currentGame.questionsData.sort(
        () => 0.5 - Math.random()
      );
      //console.log(questions);

      state.currentGameQuestions = questions;
      //state.currentQuestion.question = state.currentGameQuestions[0];
      state.questionsDispleyed.push({
        question: questions[0],
        correctAnswer: null,
        questionIndex: 0,
      });
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
      // state.currentQuestion.correctAnswer = action.payload.correctAnswer;
      // state.currentQuestion.questionIndex = action.payload.questionIndex;
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
    },
    setAnswerState: (state, action) => {
      state.questionsDispleyed[state.currentQuestionIndex].correctAnswer =
        action.payload;
    },
    setCurrentMap: (state, action) => {
      state.currentMap = action.payload;
    },
  },
});

export const gameDataActions = gameData.actions;
export default gameData.reducer;
