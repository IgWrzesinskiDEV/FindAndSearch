import Notification from "./components/UI/Notification";
import WelcomeScreen from "./components/menuComponents/welcomeScreen";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PlayGame from "./components/menuComponents/PlayGame";
import CreateGame from "./components/menuComponents/CreateGame";
import NotFound from "./components/menuComponents/notFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/FindAndSearch" element={<WelcomeScreen />} />
          <Route path="/FindAndSearch/playGame" element={<PlayGame />} />
          <Route path="/FindAndSearch/createGame" element={<CreateGame />} />
          <Route path="/FindAndSearch/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/FindAndSearch/404" />} />
        </Routes>
      </Router>
      <Notification />
    </>
  );
}

export default App;
