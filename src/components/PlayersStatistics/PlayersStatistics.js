import React, { useEffect, useState } from "react";
import "./PlayersStatistics.scss";

export default function PlayersStatistics(props) {
  const [showDotted, setDotted] = useState(false);
  const [showNotDotted, setNotDotted] = useState(false);

  useEffect(() => {
    isDotted();
  });

  const isDotted = () => {
    if (props.dotted) {
        setDotted(true);
        setNotDotted(false);
    } else {
        setDotted(false);
        setNotDotted(true);
    }
    return;
  };

  const userInitials = (name) => {
    const username = name.split([" "]);
    const initials = username[0][0] + username[1][0];
    return initials;
  };

  return (
    <section>
      {showDotted && (
        <div className="player-container">
           <h1>Most picked player</h1>
           <div className="player-content">
            <div className="most-player">
              <div className="user-initials">{userInitials(props.name)}</div>
            </div>
            <h2>{props.percent}%<div className="dash"></div></h2>
           </div>
        </div>
      )}

      {showNotDotted && (
        <div className="player-container">
          <h1>Less picked player</h1>
          <div className="player-content">
            <div>
              <div className="user-initials">{userInitials(props.name)}</div>
            </div>
            <h2>{props.percent}%<div className="dash"></div></h2>
          </div>
        </div>
      )}
    </section>
  );
}
