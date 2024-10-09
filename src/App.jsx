import Notification from "./components/UI/Notification";
import WelcomeScreen from "./components/menuComponents/welcomeScreen";
import { HashRouter, Route, Routes } from "react-router-dom";
import PlayGame from "./components/menuComponents/PlayGame";
import CreateGame from "./components/menuComponents/CreateGame";
import NotFound from "./components/menuComponents/NotFound";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/playGame" element={<PlayGame />} />
          <Route path="/createGame" element={<CreateGame />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </HashRouter>
      <Notification />
    </>
  );
}

export default App;
