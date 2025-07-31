import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { AppSwitch } from './components/ui/AppSwitch'
import { AppInput } from './components/ui/AppInput'
import { AppLabel } from './components/ui/AppLabel'
import { AppSlider } from './components/ui/AppSlider'
import { AppButton } from './components/ui/AppButton'

import App from './App.vue'
import router from './router'

import ExchangeRateAPI, { AxiosClient } from './services'

const axiosClient = new AxiosClient()
const exchangeRateAPI = new ExchangeRateAPI(axiosClient)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('exchangeRateAPI', exchangeRateAPI)

app.component('AppSwitch', AppSwitch)
app.component('AppInput', AppInput)
app.component('AppLabel', AppLabel)
app.component('AppSlider', AppSlider)
app.component('AppButton', AppButton)

app.mount('#app')
