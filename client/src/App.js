import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import CreateVg from "./Components/CreateVg/CreateVg";
import Detail from "./Components/Detail/Detail";
import About from "./Components/About/About";

function App() {
  return (
    <BrowserRouter>
      <div className="Dripp">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogames" component={CreateVg} />
          <Route exact path='/home/:id' component={Detail} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
