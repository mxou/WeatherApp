document.addEventListener("DOMContentLoaded", function () {
  const apiKey = `77e966656b8645bc9f5180035252508`;
  const form = document.getElementById("weather-form");
  const cityInput = document.getElementById("city");
  const weatherInfo = document.getElementById("weather-info");
  const actual_user_position = document.querySelector(".actual_user_position");
  const actual_user_date = document.querySelector(".actual_user_date");
  const actual_user_condition = document.querySelector(".actual_user_condition");
  const actual_user_condition_icon = document.querySelector(".actual_user_condition_icon");
  const actual_user_temp = document.querySelector(".actual_user_temp");
  const actual_user_temp_feel = document.querySelector(".actual_user_temp_feel");
  const actual_user_wind = document.querySelector(".actual_user_wind");
  const actual_user_humidity = document.querySelector(".actual_user_humidity");
  const actual_user_last_updated = document.querySelector(".actual_user_last_updated");

  //   const actual_other_position = document.querySelector(".actual_other_position");
  const actual_other_date = document.querySelector(".actual_other_date");
  const actual_other_condition = document.querySelector(".actual_other_condition");
  const actual_other_condition_icon = document.querySelector(".actual_other_condition_icon");
  const actual_other_temp = document.querySelector(".actual_other_temp");
  const actual_other_temp_feel = document.querySelector(".actual_other_temp_feel");
  const actual_other_wind = document.querySelector(".actual_other_wind");
  const actual_other_humidity = document.querySelector(".actual_other_humidity");
  const actual_other_last_updated = document.querySelector(".actual_other_last_updated");

  const submit_position_button = document.querySelector(".submit_position_button");
  const other_weather_position_input = document.querySelector(".other_weather_position_input");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude :", latitude, "Longitude :", longitude);

        // Exemple : utiliser ces coordonnées avec WeatherAPI
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&lang=fr`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            console.log(data.location.name);
            actual_user_position.textContent = data.location.name;
            actual_user_date.textContent = data.location.localtime;
            actual_user_condition.textContent = "Condition du jour : " + data.current.condition.text;
            actual_user_condition_icon.src = data.current.condition.icon;
            actual_user_temp.textContent = "Température actuelle : " + data.current.temp_c + "°C";
            actual_user_temp_feel.textContent = "Température ressentie : " + data.current.feelslike_c + "°C";
            actual_user_wind.textContent = "Vitesse du vent : " + data.current.wind_kph + "km/h";
            actual_user_humidity.textContent = "Taux d'humidité : " + data.current.humidity + "%";
            actual_user_last_updated.textContent = "Dernière mise a jour : " + data.current.last_updated;
          })
          .catch((err) => console.error(err));
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error.message);
      }
    );
  } else {
    console.log("La géolocalisation n'est pas disponible sur ce navigateur.");
  }

  submit_position_button.addEventListener("click", function () {
    // e.preventDefault();
    let city = other_weather_position_input.value;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=fr`)
      .then((res) => res.json())
      .then((data) => {
        console.log("cc");
        // actual_other_position.textContent = data.location.name;
        actual_other_date.textContent = data.location.localtime;
        actual_other_condition.textContent = "Condition du jour : " + data.current.condition.text;
        actual_other_condition_icon.src = data.current.condition.icon;
        actual_other_temp.textContent = "Température actuelle : " + data.current.temp_c + "°C";
        actual_other_temp_feel.textContent = "Température ressentie : " + data.current.feelslike_c + "°C";
        actual_other_wind.textContent = "Vitesse du vent : " + data.current.wind_kph + "km/h";
        actual_other_humidity.textContent = "Taux d'humidité : " + data.current.humidity + "%";
        actual_other_last_updated.textContent = "Dernière mise a jour : " + data.current.last_updated;
      });
  });
});
