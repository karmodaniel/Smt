import Header from "./components/Header/Header";
import "./App.scss";

import logo from "./assets/img/logo-venturus.png";

function App() {
  const user = {
    name: "Jina Carano",
  };

  return (
    <div>
      <Header logo={logo} user={user} />
    </div>
  );
}

export default App;
