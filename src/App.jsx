import { useSelector } from "react-redux";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/startedGameComponents/QuestionScreen";
import NewGame from "./components/newGameComponents/NewGame";
import Notification from "./components/UI/Notification";

function App() {
  //const currentGame = useSelector((state) => state.game.currentGame);
  const gameisStared = useSelector((state) => state.game.gameisStared);

  return (
    <>
      {gameisStared ? (
        <QuestionScreen />
      ) : (
        <>
          <StartScreen />
          <main className="flex items-center justify-center mt-5">
            {" "}
            <NewGame />
          </main>
        </>
      )}
      <Notification />
    </>
  );
}

export default App;
