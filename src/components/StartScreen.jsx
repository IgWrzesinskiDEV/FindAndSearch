import StartGameForm from "./StartGameForm";
import { useSelector } from "react-redux";
import Timer from "./Timer";
export default function StartScreen() {
  const currentGame = useSelector((state) => state.game.currentGame);

  return (
    <>
      <header className="flex flex-col items-center">
        <h1 className="my-5 text-2xl font-bold uppercase text-sky-400">
          Welcome to the game!
        </h1>
        <StartGameForm
          placeholder="id"
          label="Enter game id to start a game!"
          name="gameId"
        />
        {currentGame !== null && currentGame !== -1 && (
          <>
            <p className="mt-5">Game found!</p>
            <Timer initialTimer={1} />
          </>
        )}
        {currentGame === -1 && <p className="mt-5">Game not found!</p>}
      </header>
    </>
  );
}
