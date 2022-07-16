let form = document.querySelector("#form");
let search_bar = document.querySelector("#search-bar");
let results = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let base = "https://api.openweathermap.org/data/2.5/weather";
  let city = search_bar.value;
  let password = "b3528849799fc69ab2e46bdd46794f25";

  let api = `${base}?q=${city}&appid=${password}`;

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
  let { name, sys } = res;
  return (results.innerHTML = `<h4 class="text-center mt-3">${name}, ${sys.country}</h4>`);
};

let print_error = () => {
  return (results.innerHTML = `<h4 class="text-center mt-3">no city found</h4>`);
};
