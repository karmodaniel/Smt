import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home ";
import ManageTeam from "./pages/ManageTeam/ManageTeam";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (localStorage.getItem('teams') === null) {
      localStorage.setItem('teams', JSON.stringify([]));
    }
  });
  
  return (
    <div className="App">
      <div className="container">
        <div className="wrapper-content">
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/manage-team" exact component={ManageTeam} />
              <Route path="/manage-team/:id" component={ManageTeam} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
