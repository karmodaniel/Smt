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

  return (
    <section className="data-container">
      {showDotted && (
        <div className="player-container">
          <div className="player"></div>
          <div className="dots">
            <div className="percent">
              <h1>72%</h1>
              <div className="dash"></div>
            </div>
          </div>
        </div>
      )}

      {showNotDotted && (
        <div className="player-container">
          <div className="player-not-dotted">
            <div className="percent-not-dotted">
              <h1>72%</h1>
              <div className="dash-not-dotted"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
