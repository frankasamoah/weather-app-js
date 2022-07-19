let form = document.querySelector("#form");
let search_bar = document.querySelector("#search-bar");
let results = document.getElementById("results");
dayjs.extend(window.dayjs_plugin_utc);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loader();
  fetchData();
});

let fetchData = async () => {
  let base = "https://api.openweathermap.org/data/2.5/weather";
  let city = search_bar.value;
  let units = "metric";
  let password = "b3528849799fc69ab2e46bdd46794f25";
  let api = `${base}?q=${city}&units=${units}&appid=${password}`;

  return await fetch(api)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("hi kwaki");
      }
    })
    .then((res) => print_result(res))
    .catch((err) => print_error());
};

let loader = () => {
  return (results.innerHTML =
    "<h4 class='text-center mt-3'>Loading, Please wait .......</div>");
};

let print_result = (res) => {
  console.log(res);
  let { name, sys, main, weather, timezone } = res;
  return (results.innerHTML = `<h4 class="text-center mt-3">${name}, ${
    sys.country
  }</h4>
  <div class="cards">
  <div class="card-1">
    <img src="http://openweathermap.org/img/wn/${weather
      .filter((item, index) => index === 0)
      .map((item, index) => item.icon)}@2x.png" alt="" />
    <span class="fs-6 fw-semibold">${main.temp}° C</span>
    <span class="fw-lighter text-secondary">Temperature</span>
  </div>
  <div class="card-2">
    <i class="fs-2 bi bi-wind"></i>
    <span class="fs-6 fw-semibold">km/h</span>
    <span class="fw-lighter text-secondary">Wind</span>
  </div>
  <div class="card-3">
    <i class="fs-2 bi bi-droplet"></i>
    <span class="fs-6 fw-semibold">%</span>
    <span class="fw-lighter text-secondary">Humidity</span>
  </div>
  <div class="card-4">
    <i class="fs-2 bi bi-water"></i>
    <span class="fs-6 fw-semibold"> hPa</span>
    <span class="fw-lighter text-secondary">Pressure</span>
  </div>
  <div class="card-5">
    <i class="fs-2 bi bi-sunrise"></i>
    <span class="fs-6 fw-semibold">${hour_converter(
      sys.sunrise,
      timezone
    )}</span>
    <span class="fw-lighter text-secondary">Sun Rise</span>
  </div>
  <div class="card-6">
    <i class="fs-2 bi bi-sunset"></i>
    <span class="fs-6 fw-semibold"></span>
    <span class="fw-lighter text-secondary">Sun Set</span>
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
    .format("hh : mm A");
};
