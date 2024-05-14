const express = require("express");
require("dotenv").config();
const airports = require("./airports");

const app = express();

app.get("/", (request, response) => {
  response
    .status(200)
    .json({ msg: "Bienvenu dans mon api de gestion d'aéroports" });
});

app.get("/airports", (request, response) => {
  if (request.query.destination) {
    const filterAirports = airports.filter((airport) =>
      airport.destination.some(
        (dest) => dest.toLowerCase() === request.query.destination.toLowerCase()
      )
    );
    if (filterAirports.length > 0) {
      response.status(200).json(filterAirports);
    } else {
      response.sendStatus(404);
    }
  } else {
    response.status(200).json(airports);
  }
});

app.get("/airports/:id", (request, response) => {
  /** Etant donné un tableau d'aéroports et un id, renvoyer l'aéroport avec cet id */
  const airport = airports.find((airport) => airport.id === +request.params.id);
  if (airport) {
    response.status(200).json(airport);
  } else {
    response.sendStatus(404);
  }
});

app.get("/lastminutes", (request, response) => {
  const random = Math.floor(Math.random() * 20);
  response.status(200).json(airports[random]);
});

app.listen(process.env.PORT, () => {
  console.info(`Le serveur tourne sur le http://localhost:${process.env.PORT}`);
});
