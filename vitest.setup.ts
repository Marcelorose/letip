import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [], // ou importe suas rotas reais
})

const pinia = createPinia()
setActivePinia(pinia)

config.global.plugins = [pinia, router]

import { AppInput } from './src/components/ui/AppInput'
import { AppSwitch } from './src/components/ui/AppSwitch'
import { AppSlider } from './src/components/ui/AppSlider'
import { AppLabel } from './src/components/ui/AppLabel'
import { AppButton } from './src/components/ui/AppButton'

config.global.components = {
  AppInput,
  AppSwitch,
  AppSlider,
  AppLabel,
  AppButton,
}

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  // @ts-expect-error: for testing only
  window.ResizeObserver = ResizeObserver
  // @ts-expect-error: for testing only
  global.ResizeObserver = ResizeObserver
}
