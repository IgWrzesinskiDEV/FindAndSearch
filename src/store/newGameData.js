import { createSlice } from "@reduxjs/toolkit";
const initialNewGameState = {
    questionsAdded: [],
};

const newGameData = createSlice({
    name: "newGameData",
    initialState: initialNewGameState,
    reducers: {

    },
});

export const newGameDataActions = newGameData.actions;
export default newGameData.reducer;
