import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '@/App.vue'

const mockExchangeRateAPI = {
  getExchangeRateByCurrency: vi.fn().mockResolvedValue({ EURBRL: 5.0, USDBRL: 4.5 }),
}

vi.mock('@/components/TipParams/TipParams.vue', () => ({
  default: {
    name: 'TipParams',
    template: '<div>TipParams</div>',
    props: ['currency', 'checkTotal', 'tipPercentage', 'personCount', 'currencySymbol'],
    emits: ['update:value'],
  },
}))

vi.mock('@/components/TipResult/TipResult.vue', () => ({
  default: {
    name: 'TipResult',
    template: '<div>TipResult</div>',
    props: [
      'checkTotal',
      'tipValue',
      'totalValue',
      'totalPerPerson',
      'totalPerPersonInBrl',
      'currencySymbol',
    ],
  },
}))

function mountComponent() {
  return mount(App, {
    global: {
      plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
      provide: {
        exchangeRateAPI: mockExchangeRateAPI,
      },
    },
  })
}

describe('App.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mountComponent()
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toContain('Le/Tip')
    expect(wrapper.findComponent({ name: 'TipParams' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'TipResult' }).exists()).toBe(true)
  })

  it('switches panelShow state when button is clicked (mobile)', async () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 })
    window.dispatchEvent(new Event('resize'))
    // mount again to make sure width is updated
    wrapper = mountComponent()
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)

    await buttons[0].trigger('click')
    expect(wrapper.vm.panelShow).toBe('result')

    await buttons[1].trigger('click')
    expect(wrapper.vm.panelShow).toBe('params')
  })

  it('updates values from TipParams event', async () => {
    const tipParams = wrapper.findComponent({ name: 'TipParams' })
    await tipParams.vm.$emit('update:value', {
      currency: true,
      checkTotal: 100,
      tipPercentage: 20,
      personCount: 2,
    })

    expect(wrapper.vm.currency).toBe(true)
    expect(wrapper.vm.checkTotal).toBe(100)
    expect(wrapper.vm.tipPercentage).toBe(20)
    expect(wrapper.vm.personCount).toBe(2)
  })
})
