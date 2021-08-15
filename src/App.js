import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import logo from "./assets/img/logo-venturus.png";

function App() {
  const user = {
    name: "Jina Carano",
  };

  return (
    <div className="container">
      <div className="wrapper-content">
        <Header logo={logo} user={user} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
