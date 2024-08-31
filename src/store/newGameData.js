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
        }
    },
});

export const newGameDataActions = newGameData.actions;
export default newGameData.reducer;
