import { Route, Router } from "@solidjs/router";
import Home from "./components/Home";
import Terms from "./components/Terms";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/terms" component={Terms} />
    </Router>
  );
};

export default App;
