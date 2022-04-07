<template>
  <div class="home">
    <div class="home__header">
      <h1 class="home__title">World Weather</h1>
      <p class="home__help">Watch weather in your current location</p>
    </div>
    <div class="weather">
      <div v-if="weathers.length" class="weather__last">
        <weather-item
          v-for="(weather, idx) in weathers.slice(0, 1)"
          :key="idx"
          :object-weather="weather"
          @remove="removeWeather"
          @reload="reloadWeather"
          last
        />
      </div>
      <div v-if="weathers.length > 1" class="weather__list">
        <weather-item
          v-for="(weather, idx) in weathers.slice(1)"
          :key="idx"
          :object-weather="weather"
          @remove="removeWeather"
          @reload="reloadWeather"
        />
      </div>
    </div>
    <button
      v-if="!openModal"
      @click="openModal = true"
      class="btn-add-weatcher"
      type="button"
    >
      +
    </button>
    <modal-dialog
      :modal="openModal"
      @cancel="openModal = false"
      @add="addWeather"
    />
  </div>
</template>

<script>
import { getData, saveData } from '@/utils/watherData'
import WeatherItem from '@/components/WeatherItem.vue'
import ModalDialog from '@/components/ModalDialog.vue'
export default {
  name: 'HomeView',
  components: { WeatherItem, ModalDialog },
  data () {
    return {
      openModal: false,
      weathers: []
    }
  },
  mounted () {
    this.storageWeatchers()
  },
  methods: {
    storageWeatchers () {
      if (localStorage.getItem('weathes')) {
        this.weathers = JSON.parse(localStorage.getItem('weathes'))
      }
    },
    async addWeather (city) {
      const newWeatcher = await getData(city)
      this.weathers.push(newWeatcher)
      saveData(this.weathers)
    },
    removeWeather (id) {
      this.weathers = this.weathers.filter((item) => item.id !== id)
      saveData(this.weathers)
    },
    async reloadWeather (id) {
      const idx = this.weathers.findIndex((w) => w.id === id)
      const { weather, temperature, humidity, date } = await getData(
        this.weathers[idx].city
      )

      this.weathers[idx].weather = weather
      this.weathers[idx].temperature = temperature
      this.weathers[idx].humidity = humidity
      this.weathers[idx].date = date
      saveData(this.weathers)
    }
  }
}
</script>

<style lang="scss">
.home {
  &__title {
    font-weight: 300;
    font-size: 70px;
    line-height: 80px;
    color: #1b1b1b;
    text-align: center;
    margin-top: 24px;
  }
  &__help {
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    color: #767676;
    text-align: center;
    margin-top: 32px;
  }
}

.weather {
  margin-top: 20px;
  padding: 0 20px;

  &__last {
    max-width: 824px;
    margin: 0 auto;
  }

  &__list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 1560px;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 34px;

    .weather__item {
      width: 350px;
    }
  }
}
.btn {
  border: none;
  background-color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #9b51e0;

  &:disabled {
    color: #c1c1c1;
    cursor: default;
  }
}
.btn-add-weatcher {
  width: 56px;
  height: 56px;
  border: none;
  cursor: pointer;
  position: fixed;
  right: 45px;
  bottom: 32px;
  background: #9b51e0;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  font-size: 30px;
  color: #fff;
}

@media (max-width: 1100px) {
  .weather__last {
    max-width: 100%;

    .weather__item {
      margin: 0;
    }
  }
}
@media (max-width: 840px) {
  .weather__list {
    .weather__item {
      width: 100%;
      margin: 20px 0;
    }
  }
}
@media (max-width: 450px) {
}
</style>
