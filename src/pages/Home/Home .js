import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent/TableComponent";
import "./Home.scss";
import "../../App.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import Ranking from "../../components/Ranking/Ranking";
import PlayersStatistics from "../../components/PlayersStatistics/PlayersStatistics";

export default function Home() {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('teams');
    setDataArray(JSON.parse(data));
  }, []);

  const avgTeams = [
    {
      name: "Barcelona",
      age: 21.7,
    },
    {
      name: "Ajax",
      age: 30.7,
    },
    {
      name: "Flamengo",
      age: 22.7,
    },
    {
      name: "Flamengo",
      age: 23.7,
    },
    {
      name: "Flamengo",
      age: 24.7,
    },
  ];

  const getBiggestValue = () => {
    const maxValue = avgTeams.map((element) => {
      return element.age;
    });
    return Math.max.apply(null, maxValue);
  };

  const getLowestValue = () => {
    const maxValue = avgTeams.map((element) => {
      return element.age;
    });
    return Math.min.apply(null, maxValue);
  };

  return (
    <div className="home-container">
      <section className="card">
        <CardComponent title="My teams" action={true}>
          <TableComponent teams={dataArray} />
        </CardComponent>
      </section>
      <section className="statistics-container card">
        <section className="tops">
          <CardComponent title="Top 5" action={false}>
            <section className="card-content">
              <div className="rankings">
                <Ranking
                  title={"Highest avg age"}
                  info={avgTeams}
                  active={getBiggestValue()}
                ></Ranking>
              </div>
              <div className="rankings ranking-lowest">
                <Ranking
                  title={"Lowest avg age"}
                  info={avgTeams}
                  active={getLowestValue()}
                ></Ranking>
              </div>
            </section>
          </CardComponent>
        </section>
        <section className="field">
          <div className="most-and-less">
            <PlayersStatistics dotted={true} name={"Marilia Soares"} percent={75}></PlayersStatistics>
          </div>
          <div className="most-and-less">
            <PlayersStatistics dotted={false} name={"Daniel Araujo"} percent={25}></PlayersStatistics>
          </div>
        </section>
      </section>
    </div>
  );
}
