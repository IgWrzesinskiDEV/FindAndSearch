import { gameDataActions } from "./gameData";

export const fetchGameId = (gameId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://teraingame-c3b54-default-rtdb.europe-west1.firebasedatabase.app/games.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      console.log(responseData);

      return responseData;
      //
    };
    try {
      const gameData = await fetchData();

      const game = gameData.find((game) => {
        return game.gameId === gameId;
      });
      if (game) {
        dispatch(gameDataActions.setCurrentGame(game));

        dispatch(gameDataActions.setCurrentGameQuestions());
      } else {
        dispatch(gameDataActions.setCurrentGame(-1));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
