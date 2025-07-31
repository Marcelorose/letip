<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { useWindowSize } from '@vueuse/core'
import TipParams from './components/TipParams/TipParams.vue'
import TipResult from './components/TipResult/TipResult.vue'
import { useExchangeStore } from './stores/exchange'
import { type IExchangeRateAPI } from './services'

const exchangeRateAPI = inject('exchangeRateAPI') as IExchangeRateAPI
const exchangeStore = useExchangeStore(exchangeRateAPI)()

const currency = ref(false)
const checkTotal = ref(0)
const tipPercentage = ref(10)
const personCount = ref(2)
const totalPerPersonInBRL = ref(0)

const tipValue = computed(
  () => Math.round(((checkTotal.value * tipPercentage.value) / 100) * 100) / 100,
)
const totalValue = computed(() => Math.round((checkTotal.value + tipValue.value) * 100) / 100)
const totalPerPerson = computed(
  () => Math.round((totalValue.value / personCount.value) * 100) / 100,
)

async function getTotalPerPersonInBrl() {
  totalPerPersonInBRL.value = await exchangeStore.getTotalInBRL(totalPerPerson.value)
}

watch([totalPerPerson], async () => {
  await getTotalPerPersonInBrl()
})

watch([currency], async () => {
  exchangeStore.setCurrency(currency.value ? 'USD' : 'EUR')
  await getTotalPerPersonInBrl()
})

const panelShow = ref('params')

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

function panelClass(panel: string) {
  return {
    block: panelShow.value === panel || isMobile.value,
    hidden: panelShow.value !== panel && isMobile.value,
  }
}

function updateValues(values: {
  currency: boolean
  checkTotal: number
  tipPercentage: number
  personCount: number
}) {
  currency.value = values.currency
  checkTotal.value = values.checkTotal
  tipPercentage.value = values.tipPercentage
  personCount.value = values.personCount
}
</script>

<template>
  <div class="h-screen">
    <h1 class="text-center pt-8 pb-4 text-3xl">Le/Tip</h1>
    <div class="container m-auto">
      <div class="m-auto md:flex">
        <div class="p-3 md:p-4 md:w-1/2 m-auto" :class="panelClass('params')">
          <TipParams
            :currency="currency"
            :check-total="checkTotal"
            :tip-percentage="tipPercentage"
            :person-count="personCount"
            :currency-symbol="exchangeStore.currencySymbol"
            @update:value="updateValues"
          />
          <AppButton
            v-if="isMobile"
            class="float-end mt-2"
            variant="outline"
            size="icon"
            @click="panelShow = 'result'"
          >
            <ChevronRight class="w-4 h-4" />
          </AppButton>
        </div>
        <div class="p-3 md:p-4 md:w-1/2 m-auto text-center" :class="panelClass('result')">
          <TipResult
            :check-total="checkTotal"
            :tip-value="tipValue"
            :total-value="totalValue"
            :total-per-person="totalPerPerson"
            :total-per-person-in-brl="totalPerPersonInBRL"
            :currency-symbol="exchangeStore.currencySymbol"
          />
          <AppButton
            v-if="isMobile"
            class="float-end mt-2"
            variant="outline"
            size="icon"
            @click="panelShow = 'params'"
          >
            <ChevronLeft class="w-4 h-4" />
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import './main.css';
</style>
