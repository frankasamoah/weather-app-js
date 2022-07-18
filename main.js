let form = document.querySelector("#form");
let search_bar = document.querySelector("#search-bar");
let results = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let base = "https://api.openweathermap.org/data/2.5/weather";
  let city = search_bar.value;
  let password = "b3528849799fc69ab2e46bdd46794f25";

  let api = `${base}?q=${city}&appid=${password}&units=metric`;

  fetch(api)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("hi kwaki");
      }
    })
    .then((res) => {
      print_result(res);
    })
    .catch((err) => print_error());
});

let print_result = (res) => {
  console.log(res);
  let { name, sys, weather, main, timezone, wind } = res;
  return (results.innerHTML = `<h4 class="text-center mt-3">${name}, ${
    sys.country
  }</h4>
    <div class="cards">
      <div class="card-1">
        <img src="http://openweathermap.org/img/wn/${weather
          .filter((x, y) => y === 0)
          .map((x) => x.icon)}@2x.png" alt=""/>
        <span class="fs-6 text-semibold">${main.temp}℃</span>
        <span class="fw-lighter text-secondary" >Temperature</span>
      </div>
      <div class="card-2">
        <i class="fs-2 bi bi-wind" ></i>
        <span class="fs-6 fw-semibold">${wind.speed}km/h</span>
        <span class="fw-lighter text-secondary" >Wind</span>
      </div>
      <div class="card-3">
        <i class="fs-2 bi bi-droplet" ></i>
        <span class="fs-6 fw-semibold">${main.humidity}%</span>
        <span class="fw-lighter text-secondary" >Humidity</span>
      </div>
      <div class="card-4">
        <i class="fs-2 bi bi-water" ></i>
        <span class="fs-6 fw-semibold">${main.pressure}hPa</span>
        <span class="fw-lighter text-secondary" >Humidity</span>
      </div>
      <div class="card-5">
        <i class="fs-2 bi bi-sunrise" ></i>
        <span class="fs-6 fw-semibold">${sys.sunrise}</span>
        <span class="fw-lighter text-secondary" >Sunrise</span>
      </div>
      <div class="card-6">
        <i class="fs-2 bi bi-sunset" ></i>
        <span class="fs-6 fw-semibold">${sys.sunset}</span>
        <span class="fw-lighter text-secondary" >Sunset</span>
      </div>
    </div>
     
  
  `);
};

let print_error = () => {
  return (results.innerHTML = `<h4 class="text-center mt-3">No city found</h4>`);
};

let hour_converter = (input, timezone) => {
  return dayjs
    .unix(input)
    .utc()
    .utcOffset(timezone / 3600)
    .format("h : mm A");
};
