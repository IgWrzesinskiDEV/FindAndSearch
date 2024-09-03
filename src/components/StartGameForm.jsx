/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { fetchGameId } from "../store/currentGameStore/gamesActions";
export default function StartGameForm({ placeholder, label, name }) {
  const dispatch = useDispatch();
  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    dispatch(fetchGameId(data.gameId.toLowerCase()));
  }
  return (
    <form
      className="flex flex-col w-3/4 mx-auto gap-3 justify-center items-center h-[20vh] border-2 border-sky-500 rounded-md"
      onSubmit={submitHandler}
    >
      <label htmlFor={name} className="">
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="p-2"
      />
      <button className="w-1/3 p-2 mt-2 border-2 rounded-md border-sky-500">
        Click!
      </button>
    </form>
  );
}
