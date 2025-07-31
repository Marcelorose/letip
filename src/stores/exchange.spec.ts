// tests/stores/exchange.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent, h, provide } from 'vue'
import { mount } from '@vue/test-utils'
import { useExchangeStore } from '@/stores/exchange'
import { createPinia, setActivePinia } from 'pinia'

// Mock da API que será injetada
const mockExchangeRateAPI = {
  getExchangeRateByCurrency: vi.fn(),
}

// Componente wrapper que fornece a dependência via provide
const TestWrapper = defineComponent({
  setup() {
    provide('exchangeRateAPI', mockExchangeRateAPI)
    return () => h('div') // componente fictício apenas para ativar o contexto
  },
})

describe('useExchangeStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
    mount(TestWrapper) // ativa o provide necessário para o inject
  })

  it('should return the correct currency symbol', () => {
    const store = useExchangeStore(mockExchangeRateAPI)()
    expect(store.currencySymbol).toBe('€')

    store.setCurrency('USD')
    expect(store.currencySymbol).toBe('$')
  })

  it('should set currency correctly', () => {
    const store = useExchangeStore(mockExchangeRateAPI)()
    store.setCurrency('USD')
    expect(store.currencySymbol).toBe('$')

    store.setCurrency('EUR')
    expect(store.currencySymbol).toBe('€')
  })

  it('should fetch exchange rate if not cached', async () => {
    mockExchangeRateAPI.getExchangeRateByCurrency.mockResolvedValue({
      EURBRL: 5.12,
    })

    const store = useExchangeStore(mockExchangeRateAPI)()
    const result = await store.getTotalInBRL(10)

    expect(mockExchangeRateAPI.getExchangeRateByCurrency).toHaveBeenCalledWith('EUR')
    expect(result).toBeCloseTo(51.2, 1)
  })

  it('should use cached exchange rate on second call', async () => {
    mockExchangeRateAPI.getExchangeRateByCurrency.mockResolvedValue({
      USDBRL: 4.5,
    })

    const store = useExchangeStore(mockExchangeRateAPI)()
    store.setCurrency('USD')

    const firstCall = await store.getTotalInBRL(10)
    expect(firstCall).toBeCloseTo(45)

    const secondCall = await store.getTotalInBRL(10)
    expect(mockExchangeRateAPI.getExchangeRateByCurrency).toHaveBeenCalledTimes(1)
    expect(secondCall).toBeCloseTo(45)
  })
})
