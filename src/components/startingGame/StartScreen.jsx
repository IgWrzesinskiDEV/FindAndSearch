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

  return (
    <>
      <Section className="flex flex-col items-center">
        {currentGame === null && (
          <>
            <Link to="/FindAndSearch/">
              <button className="absolute top-0 left-0 m-4 transition-transform duration-200 hover:scale-110 ">
                <RiMenuFold3Line className="text-5xl text-primary" />
              </button>
            </Link>
            <h1 className="my-3 text-2xl font-bold text-center uppercase text-sky-400">
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
        {currentGame !== null && <Timer initialTimer={1} />}
      </Section>
    </>
  );
}
