<template>
  <div v-if="modal" class="modal">
    <div class="modal__dialog">
      <div class="modal__content">
        <div class="modal__header">
          <h5 class="modal__title">Choose a city</h5>
          <p class="modal__help">
            To find city start typing and pick one from the suggestions
          </p>
        </div>
        <div class="modal__body">
          <input
            v-model="city"
            :class="{ 'input-error': v$.city.$error }"
            type="text"
            placeholder="Search city"
          />
          <span class="modal__error" v-if="v$.city.$error">Choose a city</span>
        </div>
        <div class="modal__footer">
          <div class="modal__footer-left">
            <button
              :disabled="!city.length"
              @click="city = ''"
              type="button"
              class="btn"
            >
              CLEAR
            </button>
          </div>
          <div class="modal__footer-right">
            <button @click="$emit('cancel')" type="button" class="btn">
              CANCEL
            </button>
            <button
              @click="addWeather"
              type="button"
              :disabled="v$.city.$invalid"
              class="btn"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'ModalDialog',
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'add'],
  data () {
    return {
      v$: useVuelidate(),
      city: ''
    }
  },
  validations () {
    return {
      city: { required }
    }
  },
  methods: {
    addWeather () {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.$emit('add', this.city)
        this.$emit('cancel')
        this.city = ''
      }
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;

  &__dialog {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
  }

  &__content {
    max-width: 751px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.14),
      0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 24px;
    z-index: 900;
    position: relative;
    transition: all 0.3s ease;
  }
  &__title {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #1b1b1b;
  }
  &__help {
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    color: #767676;
    margin-top: 16px;
  }
  &__error {
    display: block;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ff0101;
    margin-top: 12px;
  }
  &__body {
    margin-top: 67px;

    .input-error {
      border-bottom: 1px solid #ff0101;
    }

    input {
      border: none;
      width: 100%;
      border-bottom: 1px solid #1b1b1b;
      padding: 16px 0;
      font-weight: 500;
      font-size: 24px;
      line-height: 24px;
      color: #1b1b1b;
    }
  }
  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 140px;
  }
}
</style>
