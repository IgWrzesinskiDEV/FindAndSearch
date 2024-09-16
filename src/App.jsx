import Notification from "./components/UI/Notification";
import WelcomeScreen from "./components/menuComponents/welcomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlayGame from "./components/menuComponents/PlayGame";
import CreateGame from "./components/menuComponents/CreateGame";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/FindAndSearch" element={<WelcomeScreen />} />
          <Route path="/FindAndSearch/playGame" element={<PlayGame />} />
          <Route path="/FindAndSearch/createGame" element={<CreateGame />} />
        </Routes>
      </Router>
      <Notification />
    </>
  );
}

export default App;
