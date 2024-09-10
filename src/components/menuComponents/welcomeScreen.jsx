import { Link } from "react-router-dom";
import Button from "../UI/Button";
export default function WelcomeScreen() {
  return (
    <header className="flex flex-col items-center ">
      <h1 className="mt-5 text-4xl font-bold uppercase text-primaryLighter">
        Find and Search
      </h1>
      <img src="gameLogo.png" alt="A map with marker on it" className="w-80" />

      <div className="flex flex-col items-center gap-6 mt-8">
        <Link to="/playGame">
          <Button className="px-4 py-2 text-4xl font-bold text-white border-none rounded bg-primary">
            Start Game
          </Button>
        </Link>
        <p className="text-5xl font-bold uppercase text-primary">OR</p>

        <Link to="/createGame">
          <Button className="px-4 py-2 text-4xl font-bold text-white border-none rounded bg-primary">
            Create New Game
          </Button>
        </Link>
      </div>
    </header>
  );
}
