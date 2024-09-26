import StartGameForm from "./StartGameForm";
import { useSelector } from "react-redux";
import Timer from "./Timer";
import Section from "../UI/Section";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";

import { RiMenuFold3Line } from "react-icons/ri";

export default function StartScreen() {
  const currentGame = useSelector((state) => state.game.currentGame);
  const isLoading = useSelector((state) => state.app.isLoading);
  let timer = 10;
  const questionsDisplayed = JSON.parse(localStorage.getItem("questionsDisplayed"));

  if (questionsDisplayed) {
    timer = 0;
  }
  if (questionsDisplayed && questionsDisplayed.length === 1 && questionsDisplayed[0].correctAnswer === null) {
    timer = 10;
  }

  return (
    <>
      <Section className="flex flex-col items-center">
        {currentGame === null && !isLoading && (
          <>
            <Link to="/">
              <button className="absolute top-0 left-0 m-4 transition-transform duration-200 hover:scale-110 ">
                <RiMenuFold3Line className="text-5xl text-primary" />
              </button>
            </Link>
            <h1 className="w-1/2 my-3 text-2xl font-bold text-center uppercase break-words text-wrap text-sky-400">
              To start
              <br /> enter the game id
            </h1>
            <StartGameForm
              placeholder="id"
              label="Enter game id to start a game!"
              name="gameId"
            />
          </>
        )}
        {isLoading && <Loader loaderText="Searching for a game..." />}
        {currentGame !== null && <Timer initialTimer={timer} />}
      </Section>
    </>
  );
}
