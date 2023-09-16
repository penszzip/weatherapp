const form = document.querySelector('#weatherForm');
const input = document.querySelector('#locationInput');
const forecast = document.querySelector('.forecast')

form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        if (document.querySelector('p')) {
            reset()
            forecast.classList.remove('pb-1')
        }

        const location = input.value;
        const coordinates = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`)
        const { latitude, longitude } = coordinates.data.results[0]
        
        const weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        const { current_weather } = weather.data
        
        input.value = ''
        
        const label = document.createElement('p')
        label.classList.add('h2')
        label.innerText = location
        const temperature = document.createElement('p')
        temperature.classList.add('h1')
        temperature.classList.add('temperature')
        temperature.innerText = `${current_weather.temperature} \u2103`
        const windSpeed = document.createElement('p')
        windSpeed.classList.add('h3')
        windSpeed.classList.add('windSpeed')
        windSpeed.innerText = `Wind speed: ${current_weather.windspeed} km/h`

        forecast.append(label)
        forecast.append(temperature)
        forecast.append(windSpeed)
        forecast.classList.add('pb-1')
    } catch (error) {
        console.log(error)
    }
})

function reset() {
    const disposeItems = document.querySelectorAll('p')
    disposeItems.forEach(item => {
        item.remove()
    })
}