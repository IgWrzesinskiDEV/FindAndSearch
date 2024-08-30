import { useSelector } from "react-redux";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import NewGame from "./components/NewGame";
function App() {
  //const currentGame = useSelector((state) => state.game.currentGame);
  const gameisStared = useSelector((state) => state.game.gameisStared);

  return <>{gameisStared ? <QuestionScreen /> : <StartScreen />}
    <main className="flex items-center justify-center mt-5"> <NewGame /></main>
  </>;
}

export default App;
