/* eslint-disable react/prop-types */
import Input from "../UI/Input";
import Button from "../UI/Button";
import Table from "./Table";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import Section from "../UI/Section";
export default function AddNewGameSection({
  openModalHandler,
  newQuestionsModalRef,
  confirmModalRef,
}) {
  const newGameQuestions = useSelector(
    (state) => state.newGame.newGameQuestions
  );
  const gameIdRef = useRef();
  return (
    <Section className="w-full">
      <h1 className="my-5 text-2xl font-bold text-center uppercase text-sky-400">
        Create new game here!
      </h1>
      <form className="flex flex-col items-center w-3/4 p-4 border-2 rounded-md gap-y-4 border-primary">
        <Input
          label="Choose a id for your game!"
          labelClassName="text-lg pb-4 text-center lg:text-3xl"
          placeholder="game ID"
          name="gameId"
          ref={gameIdRef}
          className="w-1/5"
        />
        <Table />

        <div id="popOver"></div>

        <Button
          onClick={() => openModalHandler(newQuestionsModalRef)}
          type="button"
        >
          Add question <FaPlus />
        </Button>
        <Button
          onClick={() => openModalHandler(confirmModalRef)}
          type="button"
          disabled={newGameQuestions.length === 0}
        >
          Add game
        </Button>
      </form>
    </Section>
  );
}
