import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MyTeams from "./components/MyTeams/MyTeams";

import logo from "./assets/img/logo-venturus.png";

function App() {
  const user = {
    name: "Jina Carano",
  };

  const teams = [{
    name: "Barcelona",
    description: "Barcelona Squad"
  },
  {
    name: "Cluble de Regatas Flamengo",
    description: "Flamengo Squad"
  }];

  return (
    <div className="container">
      <div className="wrapper-content">
        <Header logo={logo} user={user} />
        <MyTeams teams={teams} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
