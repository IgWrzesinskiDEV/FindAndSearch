import { useSelector } from "react-redux";

import StartScreen from "../StartScreen";
import QuestionScreen from "../startedGameComponents/QuestionScreen";

export default function PlayGame() {
  const gameisStared = useSelector((state) => state.game.gameisStared);
  return <>{gameisStared ? <QuestionScreen /> : <StartScreen />}</>;
}
