import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { gameDataActions } from "../store/gameData";
// eslint-disable-next-line react/prop-types
export default function Timer({ initialTimer }) {
  const [time, setTime] = useState(initialTimer);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      dispatch(gameDataActions.setGameIsStarted(true));
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, dispatch]);

  return (
    <div>
      <h3>Game will start in:{time}s</h3>
    </div>
  );
}
