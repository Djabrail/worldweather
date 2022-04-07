<template>
  <div class="weather__item">
    <div v-if="last" class="weather__header">
      <h4 class="weather__city">
        {{ objectWeather.city }}, {{ objectWeather.country }}
      </h4>
      <p class="weather__description">Your current location</p>
    </div>
    <div v-else class="weather__header">
      <h4 class="weather__city">{{ objectWeather.city }}</h4>
      <p class="weather__description">{{ objectWeather.country }}</p>
    </div>
    <div class="weather__body">
      <div class="indicator__list">
        <div class="indicator__item">
          <p>Weather</p>
          <p>{{ objectWeather.weather }}</p>
        </div>
        <div class="indicator__item">
          <p>Temperature</p>
          <p>{{ objectWeather.temperature }} °C</p>
        </div>
        <div class="indicator__item">
          <p>Humidity</p>
          <p>{{ objectWeather.humidity }} %</p>
        </div>
      </div>
      <div class="weather__minutes">{{ datetime }}</div>
    </div>
    <div class="weather__footer">
      <button @click="reload(objectWeather.id)" class="btn" type="submit">
        RELOAD
      </button>
      <button
        v-if="!last"
        @click="$emit('remove', objectWeather.id)"
        class="btn"
        type="submit"
      >
        REMOVE
      </button>
    </div>
  </div>
</template>

<script>
import { momentDate } from '@/utils/momentDate'
export default {
  props: {
    objectWeather: Object,
    last: Boolean
  },
  data () {
    return {
      datetime: momentDate(this.objectWeather.date)
    }
  },
  mounted () {
    this.updateDateTime()
  },
  methods: {
    updateDateTime () {
      setInterval(this.update, 60000)
    },
    reload (id) {
      this.$emit('reload', id)
      setInterval(() => this.update())
    },
    update () {
      this.datetime = momentDate(this.objectWeather.date)
    }
  }
}
</script>

<style lang="scss">
.weather {
  &__city {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #1b1b1b;
    text-transform: uppercase;
  }

  &__description {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #1b1b1b;
    margin-top: 15px;
  }

  &__item {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25);
    border-radius: 6px;
    padding: 24px;
    margin: 20px;
    box-sizing: border-box;
  }
  &__minutes {
    margin-top: 8px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    color: #a8a8a8;
  }

  &__footer {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 32px;
  }
}

.indicator {
  &__list {
    margin-top: 40px;
  }
  &__item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c4c4c4;
    height: 40px;

    p {
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      color: #1b1b1b;
    }
  }
}
</style>
