import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StartScreen from "../StartScreen";
import QuestionScreen from "../startedGameComponents/QuestionScreen";
import { RiMenuFold3Line } from "react-icons/ri";
export default function PlayGame() {
  const gameisStared = useSelector((state) => state.game.gameisStared);
  return (
    <>
      {gameisStared ? (
        <QuestionScreen />
      ) : (
        <>
          <Link to="/">
            <button className="absolute top-0 left-0 m-4 transition-transform duration-200 hover:scale-110 ">
              <RiMenuFold3Line className="text-5xl text-primary" />
            </button>
          </Link>
          <StartScreen />
        </>
      )}
    </>
  );
}
