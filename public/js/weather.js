const cityname = document.querySelector("#inputField");
const btn = document.getElementById("submit");
const weatherDisplay = document.querySelector(".weatherDisplay");
const errormsg = document.querySelector(".errormsg");
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const cityName = document.querySelector(".cityname");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const temp_min = document.querySelector(".temp_min");
const temp_max = document.querySelector(".temp_max");
const weather = document.querySelector(".weather");
const currdate = new Date();
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let c = `${currdate.getDate()} ${months[currdate.getMonth()]}, ${days[currdate.getDay()]}`;
const svgs = Array.from(document.querySelectorAll(".icon"));
const cards = Array.from(document.querySelectorAll(".card"));
const mediaQuery = window.matchMedia('(min-width: 768px)')




const getInfo = async () => {

  // removing classes to making canvas all clear
  removingClasses();
  errormsg.innerText = "";

  svgs.forEach((val) => {
    val.classList.remove("visible");
  });

  let cityVal = cityname.value;


  if (cityVal === "") {
    console.log(`nothing`);
    errormsg.innerText = `Please type your desired location`;
    errormsg.classList.add("visible");
  } else {
    try {
      // checking of url
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=7401210eafbdf41c2a3d044478b7471c`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      temp.innerHTML = `${arrData[0].main.temp} <sup>o</sup>`;
      temp_max.innerText = arrData[0].main.temp_max;
      temp_min.innerText = arrData[0].main.temp_min;
      wind.innerText = arrData[0].wind.speed + "m/s";
      weather.innerText = arrData[0].weather[0].main;
      cityName.innerText = arrData[0].name + ", " + arrData[0].sys.country;
      date.innerText = c;

      console.log(weather.innerText);

      // visibiling the corresponding svg

      if (weather.innerText === "Clear") {
        svgs.forEach((val) => {
          if (val.getAttribute("id") === "sunny") {
            val.classList.add("visible");
          }
        });
      } else if (weather.innerText === "Clouds") {
        svgs.forEach((val) => {
          if (val.getAttribute("id") === "cloudy") {
            val.classList.add("visible");
          }
        });
      } else if (weather.innerText === "Partially Cloudy") {
        svgs.forEach((val) => {
          if (val.getAttribute("id") === "partly-cloudy") {
            val.classList.add("visible");
          }
        });
      } else if (weather.innerText === "Snow") {
        svgs.forEach((val) => {
          if (val.getAttribute("id") === "snowy") {
            val.classList.add("visible");
          }
        });
      } else if (weather.innerText === "Rain") {
        svgs.forEach((val) => {
          if (val.getAttribute("id") === "rainy") {
            day.classList.add("darkbg");
            val.classList.add("visible");

            cards.forEach((el) => {
              el.classList.add("darkbgSmall");
              el.classList.add("darkbgText");
            });

            cityName.classList.add("darkbgText");
            temp.classList.add("darkbgText");
            date.classList.add("darkbgText");
          }
        });
      } else if (weather.innerText === "Haze" || weather.innerText === "wind" || weather.innerText === "Mist") {
        svgs.forEach((val) => {
          if (val.getAttribute("id") === "windy") {
            val.classList.add("visible");
          }
        });
      }

      // visibility in UI

      errormsg.classList.remove("visible");
      day.classList.add("visible");
      day.style.opacity = "1";

    } catch {
      day.classList.remove("visible");
      errormsg.innerText = "Please Write the correct location";
      errormsg.classList.add("visible");
      day.style.opacity = "0";
    }
  }
};

btn.addEventListener("click", getInfo);

cityname.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    getInfo();
  }
});

function removingClasses() {

  errormsg.classList.remove("visible");
  day.classList.remove("visible");

  day.classList.remove("darkbg");
  // val.classList.remove("visible");

  cards.forEach((el) => {
    el.classList.remove("darkbgSmall");
    el.classList.remove("darkbgText");
  });

  cityName.classList.remove("darkbgText");
  temp.classList.remove("darkbgText");
  date.classList.remove("darkbgText");
}