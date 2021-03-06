/* CARDS */

// Global
const people = document.querySelector("#characters");
const moons = document.querySelector("#moons");
const planets = document.querySelector("#planets");
const spaceships = document.querySelector("#spaceships");

//  Getting the api data needed for the card

getData = async (params) => {
  const getData = await fetch(`https://swapi.dev/api/${params}`);
  const data = await getData.json();
  return data;
};

// Card values are shown at a small time interval

fillCards = async () => {
  const countPeoples = await getData("people");
  people.innerHTML = `${countPeoples.count}`;

  const countMoons = await getData("vehicles");
  moons.innerHTML = `${countMoons.count}`;

  const countPlanets = await getData("planets");
  planets.innerHTML = `${countPlanets.count}`;

  const countStarchips = await getData("starships");
  spaceships.innerHTML = `${countStarchips.count}`;
};

/* 
    //  Card values are shown at the same time.
    fillCards = () => {
    Promise.all([
        getData("people"),
        getData("vehicles"),
        getData("planets"),
        getData("starships"),
    ]).then((counts) => {
        people.innerHTML = `${counts[0]}`;
        moons.innerHTML = `${counts[1]}`;
        planets.innerHTML = `${counts[2]}`;
        spaceships.innerHTML = `${counts[3]}`;
    });
    }; 
*/

fillCards();

/* TABLE */

formatDate = (date) => {
  const splittedDate = date.split("-");
  return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
};

fillTable = () => {
  Promise.all([getData("films")]).then((data) => {
    const tbody = document.querySelector("#tbody-js");
    const dataTable = data[0].results;

    dataTable.forEach((informationsFilms) => {
      tbody.innerHTML += `<tr>
      <td>${informationsFilms.title}</td>
      <td>${formatDate(informationsFilms.release_date)}</td>
      <td>${informationsFilms.director}</td>
      <td id="episodeFilm">${informationsFilms.episode_id}</td>
    <tr>`;
    });
  });
};

fillTable();

/* PIECHART */

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const dataPlanets = getData("planets");
  const planetsInformations = await dataPlanets;
  const planet = planetsInformations.results;
  dataArray = [
    ["PlanetName", "Diameter"],
    [planet[5].name, Number(planet[5].diameter)],
    [planet[9].name, Number(planet[9].diameter)],
    [planet[8].name, Number(planet[1].diameter)],
    [planet[7].name, Number(planet[0].diameter)],
    [planet[1].name, Number(planet[2].diameter)],
  ];
  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Top 5 of biggest planets",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}
