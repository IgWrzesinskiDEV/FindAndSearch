import { useDispatch } from "react-redux";
import { fetchGameId } from "../../store/currentGameStore/gamesActions";
import Button from "../UI/Button";
import { useEffect } from "react";
import { gameDataActions } from "../../store/currentGameStore/gameData";
import { current } from "@reduxjs/toolkit";

export default function StartGameForm({ placeholder, label, name }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentGame") && localStorage.getItem("questionsDisplayed")) {
      dispatch(gameDataActions.setCurrentGameFromLS({ currentGame: JSON.parse(localStorage.getItem("currentGame")), questionsDispleyed: JSON.parse(localStorage.getItem("questionsDisplayed")) }));

    }
  }, [dispatch]);
  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    dispatch(fetchGameId(data.gameId.toLowerCase()));
  }
  return (
    <form
      className="flex flex-col items-center justify-center w-3/4 gap-3 p-4 mx-auto border-2 rounded-md border-sky-500"
      onSubmit={submitHandler}
    >
      <label htmlFor={name} className="text-lg text-center lg:text-3xl">
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="w-1/2 p-2 text-center border-2 rounded-md border-sky-500"
        autoCapitalize="off"
      />
      <Button>Find Game</Button>
    </form>
  );
}
