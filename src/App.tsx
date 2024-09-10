import { Route, Router } from "@solidjs/router";
import Home from "./components/Home";
import Terms from "./components/Terms";
import Invite from "./components/Invite";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/terms" component={Terms} />
      <Route path="/invite" component={Invite} />
    </Router>
  );
};

export default App;
