/* eslint-disable react/prop-types */
import Button from "./Button";

export default function ConfirmExit({ closeExtiModal, exitHandler, text }) {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h1 className="text-3xl font-bold text-center text-red-600 uppercase">
        Are you sure?
      </h1>
      <p className="mt-6 text-2xl font-bold text-center">{text}</p>
      <p className="mt-6 text-2xl font-bold text-center">
        All progress will be lost!
      </p>
      <div className="flex w-3/4 my-6 justify-evenly">
        <Button className="bg-red-500 border-none " onClick={closeExtiModal}>
          No
        </Button>
        <Button
          // className="flex items-center justify-center w-1/4 p-2 mt-2 border-2 rounded-md border-sky-500"
          onClick={exitHandler}
          className="bg-green-500 border-none"
        >
          Yes
        </Button>
      </div>
    </div>
  );
}
