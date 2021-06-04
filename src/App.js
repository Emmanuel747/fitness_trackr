import { Navigation, Routes } from "./components";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <Navigation />
        </header>
        <body>
          <Routes />
        </body>
      </div>
    </Router>
  );
};

export default App;
