import { useSelector } from "react-redux";
import NewQuestion from "./NewQuestion";
export default function Table() {
  const newGameQuestions = useSelector(
    (state) => state.newGame.newGameQuestions
  );
  const thClass = "border-2 p-4 border-primary";
  // console.log(newGameQuestions);

  return newGameQuestions.length > 0 ? (
    <table className="border-2 table-auto border-primary ">
      <thead>
        <tr>
          <th className={thClass}>Question</th>
          <th className={thClass}>Answer</th>
        </tr>
      </thead>
      <tbody>
        {newGameQuestions.map((question) => (
          <NewQuestion question={question} key={question.id} />
        ))}
      </tbody>
    </table>
  ) : null;
}
