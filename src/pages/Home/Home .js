import React from "react";
import MyTeams from "../../components/MyTeams/MyTeams";
import "./Home.scss";
import "../../App.scss";

export default function Home() {
  const teams = [
    {
      name: "Barcelona",
      description: "Barcelona Squad",
    },
    {
      name: "Cluble de Regatas Flamengo",
      description: "Flamengo Squad",
    },
  ];

  return (
    <div className="container">
      <div className="wrapper-content">
        <MyTeams teams={teams} />
      </div>
    </div>
  );
}
