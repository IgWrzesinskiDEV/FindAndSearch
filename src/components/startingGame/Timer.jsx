import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { gameDataActions } from "../../store/currentGameStore/gameData";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function Timer({ initialTimer }) {
  const [time, setTime] = useState(initialTimer);
  const dispatch = useDispatch();
  const location = useLocation();


  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    if (location.pathname === "/") {
      clearInterval(interval);
    } else if (time === 0) {
      clearInterval(interval);
      dispatch(gameDataActions.setGameIsStarted(true));
    }
    return () => {
      clearInterval(interval);
    };
  }, [location.pathname, time, dispatch]);
  let timerClass;
  if (time <= 3) {
    timerClass = "text-red-500";
  } else if (time <= 7) {
    timerClass = "text-yellow-500";
  } else {
    timerClass = "text-green-500";
  }
  return (
    <div className="absolute flex flex-col items-center justify-center w-3/4 gap-4 text-center uppercase -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <h3 className="text-5xl font-semibold text-primaryLighter">
        Game will start in:
      </h3>
      <p className={`font-bold  text-9xl ` + timerClass}>{time}</p>
    </div>
  );
}
