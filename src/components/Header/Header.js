import React from "react";
import "./Header.scss";

export default function Header(props) {
  const userInitials = () => {
    const username = props.user.name.split([" "]);
    const initials = username[0][0] + username[1][0];
    return initials;
  };

  return (
    <header className="header">
      <div className="wrapper">
        <section className="company-logo">
          <div>
            <img src={props.logo} alt="Venturus logo" className="logo"></img>
          </div>
          <div className="app-name">
            <h1>Squand Management Tool</h1>
          </div>
        </section>
        <section className="user-info">
          <div className="username">{props.user.name}</div>
          <div className="user-initials">{userInitials()}</div>
        </section>
      </div>
    </header>
  );
}
