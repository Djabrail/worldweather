import axios from 'axios'

const getData = async function (city) {
  try {
    const result = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_ID}&units=metric`
    )
    return {
      id: new Date().getUTCMilliseconds(),
      city: city,
      country: result.data.sys.country,
      weather: result.data.weather[0].main,
      temperature: result.data.main.temp,
      humidity: result.data.main.humidity,
      date: new Date()
    }
  } catch (e) {
    console.log(e)
  }
}

const saveData = (data) => {
  localStorage.setItem('weathes', JSON.stringify(data))
}

export { getData, saveData }
