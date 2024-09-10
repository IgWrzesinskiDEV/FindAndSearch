/* eslint-disable react/prop-types */
import Input from "../UI/Input";
import Button from "../UI/Button";
import Table from "./Table";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import Section from "../UI/Section";
const AddNewGameSection = forwardRef(function AddNewGameSection(
  { openModalHandler, newQuestionsModalRef, confirmModalRef },
  ref
) {
  const newGameQuestions = useSelector(
    (state) => state.newGame.newGameQuestions
  );

  return (
    <Section className="w-full">
      <h1 className="w-1/2 my-3 text-2xl font-bold text-center uppercase text-sky-400">
        Create new game here!
      </h1>
      <form className="flex flex-col items-center w-3/4 p-4 border-2 rounded-md gap-y-4 border-primary">
        <Input
          label="Choose a id for your game!"
          labelClassName="text-lg pb-4 text-center lg:text-3xl"
          placeholder="game ID"
          name="gameId"
          ref={ref}
          className="w-2/5 lg:w-1/5"
        />
        <Table />

        <div id="popOver"></div>

        <Button
          onClick={() => openModalHandler(newQuestionsModalRef)}
          type="button"
          className="leading-8"
        >
          <FaPlus className="text-2xl " /> Add question
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
});
export default AddNewGameSection;
