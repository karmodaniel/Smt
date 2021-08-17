import React from "react";
import "./Ranking.scss";

export default function Ranking(props) {
  const teams = props.info;

  const findBiggestValue = (value) => {
    return props.active ===  value ? "biggest" : '';
  }

  return (
    <section>
      <h2 className="ranking-title">{props.title}</h2>
      <section className="ranking-container">
        { teams.lenght !== 0 && teams.map((team) => (
          <ul className={"ranking " + findBiggestValue(team.age)}>
            <li className="ranking-item ">
              <span className="ranking-team">{team.name}</span>
              <span className="ranking-avg">{team.age}</span>
            </li>
            { teams.lenght === 0 && <li className="ranking-item">
              <span className="empty-ranking">No Ranking Available</span>
            </li>}
          </ul>
        ))}
      </section>
    </section>
  );
}
