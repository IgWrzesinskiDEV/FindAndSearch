import { useSelector } from "react-redux";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
function App() {
  //const currentGame = useSelector((state) => state.game.currentGame);
  const gameisStared = useSelector((state) => state.game.gameisStared);

  return <>{gameisStared ? <QuestionScreen /> : <StartScreen />}</>;
}

export default App;
