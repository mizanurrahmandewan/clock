const week = document.querySelector('.week');
const time = document.querySelector('.time');
const month = document.querySelector('.month');
const day = document.querySelector('.day');
const weeks = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY'
];
const months = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER'
];
const year = document.querySelector('.year');

setInterval(function() {
  const x = new Date();
  week.innerHTML = weeks[x.getDay()];
  month.innerHTML = months[x.getMonth()];
  day.innerHTML = x.getDate();
  year.innerHTML = x.getFullYear();
  time.innerHTML = x.toLocaleTimeString();
}, 1000);

navigator.geolocation.watchPosition(function(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const key = `659864ee77400e4c4baa8f26d088d781`;
  const http = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  http.open('GET', url);
  http.send();

  http.onreadystatechange = e => {
    const res = http.responseText;
    const json = JSON.parse(res);
    const timeZone = json.timezone;
    const rise = json.sys.sunrise + timeZone;
    const set = json.sys.sunset + timeZone;
    const timeUtc = Math.ceil(Date.now() / 1000) + timeZone;

    if (rise < timeUtc && set > timeUtc) {
      const doc = document.querySelector('.clock');

      doc.style.backgroundImage = 'url(./img/day.jpg)';
      doc.style.backgroundSize = 'cover';
      document.querySelector('.dayOrNight').innerHTML = 'DAY';
    } else {
      const doc = document.querySelector('.clock');

      doc.style.backgroundImage = 'url(./img/moon.jpg)';
      doc.style.backgroundSize = 'cover';
      doc.style.color = 'white';
      document.querySelector('.dayOrNight').innerHTML = 'NIGHT';
    }
  };
});
