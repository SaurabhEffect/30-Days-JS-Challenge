const arrow = document.querySelector(".arrow");
const speed = document.querySelector(".speed-value");

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(data) {
  const speedKmH = data.coords.speed ? data.coords.speed * 3.6 : 0;
  speed.textContent = speedKmH.toFixed(1);
  if (data.coords.heading !== null && !isNaN(data.coords.heading)) {
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  }

  console.log({
    speed: speedKmH + " km/h",
    heading: data.coords.heading,
    raw: data,
  });
}

function error(err) {
  console.error("Error occurred:", err);
  alert(`Error: ${err.message}. Please allow location access!`);
}

navigator.geolocation.watchPosition(success, error, options);
