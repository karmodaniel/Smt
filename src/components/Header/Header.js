import React from "react";
import "./Header.scss";
import logo from "../../assets/img/logo-venturus.png";

export default function Header() {
  const user = {
    name: "Jina Carano",
  };

  const userInitials = () => {
    const username = user.name.split([" "]);
    const initials = username[0][0] + username[1][0];
    return initials;
  };

  return (
    <header className="header">
      <div className="wrapper">
        <section className="company-logo">
          <div>
            <img src={logo} alt="Venturus logo" className="logo"></img>
          </div>
          <div className="app-name">
            <h1>Squand Management Tool</h1>
          </div>
        </section>
        <section className="user-info">
          <div className="username">{user.name}</div>
          <div className="user-initials">{userInitials()}</div>
        </section>
      </div>
    </header>
  );
}
