import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type IExchangeRateAPI } from '@/services'

const currencies = {
  EUR: {
    id: 'EUR',
    name: 'Euro',
    symbol: '€',
    exchangeCode: 'EURBRL',
  },
  USD: {
    id: 'USD',
    name: 'US Dollar',
    symbol: '$',
    exchangeCode: 'USDBRL',
  },
}

export const useExchangeStore = (exchangeRateAPI: IExchangeRateAPI) =>
  defineStore('exchange', () => {
    const selectedCurrency = ref<(typeof currencies)[keyof typeof currencies]>(currencies.EUR)
    const exchangeMap = new Map<string, number>()

    const currencySymbol = computed(() => {
      switch (selectedCurrency.value.id) {
        case 'EUR':
          return '€'
        case 'USD':
          return '$'
        default:
          return ''
      }
    })

    async function getTotalInBRL(total: number) {
      if (!exchangeMap.has(selectedCurrency.value.exchangeCode)) {
        const res = (await exchangeRateAPI.getExchangeRateByCurrency(
          selectedCurrency.value.id,
        )) as any
        exchangeMap.set(
          selectedCurrency.value.exchangeCode,
          res[selectedCurrency.value.exchangeCode],
        )
      }
      const multiplier = exchangeMap.get(selectedCurrency.value.exchangeCode) ?? 1
      return Math.round(total * multiplier * 100) / 100
    }

    function setCurrency(newCurrency: keyof typeof currencies) {
      if (!currencies[newCurrency]) return
      selectedCurrency.value = currencies[newCurrency]
    }

    return { currencySymbol, getTotalInBRL, setCurrency }
  })
