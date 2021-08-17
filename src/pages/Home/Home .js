import React from "react";
import TableComponent from "../../components/TableComponent/TableComponent";
import "./Home.scss";
import "../../App.scss";
import CardComponent from "../../components/CardComponent/CardComponent";

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
        <section className="teste">
          <CardComponent title="My teams" action={true}>
            <TableComponent teams={teams} />
          </CardComponent>
        </section>
      </div>
    </div>
  );
}
