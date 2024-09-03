export default function WelcomeScreen() {
  return (
    <header className="flex flex-col items-center">
      <h1 className="my-5 text-2xl font-bold text-red-600 uppercase">
        Welcome to the Find and Search Game!
      </h1>
      <img src="" alt="" />
      <h2 className="my-5 text-2xl font-bold uppercase text-cyan-500">
        To start game click this button
      </h2>
      {/* <Link to="/playGame">
        <button className="px-4 py-2 font-bold text-white rounded bg-cyan-500">
          Start Game
        </button>
      </Link>
      <h2 className="my-5 text-2xl font-bold uppercase text-cyan-500">
        To create a new game click this button
      </h2>
      <Link to="/createGame">
        <button className="px-4 py-2 font-bold text-white rounded bg-cyan-500">
          Create New Game
        </button>
      </Link> */}
    </header>
  );
}
