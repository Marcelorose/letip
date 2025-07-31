import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TipParams from './TipParams.vue'

describe('TipParams.vue', () => {
  function mountComponent(overrides = {}) {
    return mount(TipParams, {
      props: {
        currency: false,
        checkTotal: 0,
        tipPercentage: 10,
        personCount: 2,
        currencySymbol: '$',
        ...overrides,
      },
    })
  }

  it('renders the initial values correctly', () => {
    const wrapper = mountComponent()

    expect(wrapper.find('[data-test-id="currency-switch"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="check-total"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="tip-slider"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="person-slider"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Gorgeta: 10%')
    expect(wrapper.text()).toContain('Pessoas: 2')
  })

  it('emits update:value when currency switch is toggled', async () => {
    const wrapper = mountComponent()
    const switchInput = wrapper.find('[data-test-id="currency-switch"]')

    await switchInput.trigger('click')

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted!.at(-1)).toEqual([
      {
        currency: true,
        checkTotal: 0,
        tipPercentage: 10,
        personCount: 2,
      },
    ])
  })

  it('emits update:value when checkTotal input is changed', async () => {
    const wrapper = mountComponent()
    const input = wrapper.find('[data-test-id="check-total"]')

    await input.setValue(123)

    const emitted = wrapper.emitted('update:value')
    expect(emitted!.at(-1)?.[0].checkTotal).toBe(123)
  })

  it('emits update:value when tip slider is changed', async () => {
    const wrapper = mountComponent()
    const slider = wrapper.findComponent('[data-test-id="tip-slider"]')

    await slider.vm.$emit('update:model-value', [15])

    const emitted = wrapper.emitted('update:value')
    expect(emitted!.at(-1)?.[0].tipPercentage).toBe(15)
  })

  it('emits update:value when person slider is changed', async () => {
    const wrapper = mountComponent()
    const slider = wrapper.findComponent('[data-test-id="person-slider"]')

    await slider.vm.$emit('update:model-value', [4])

    const emitted = wrapper.emitted('update:value')
    expect(emitted!.at(-1)?.[0].personCount).toBe(4)
  })
})
