const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY'

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });