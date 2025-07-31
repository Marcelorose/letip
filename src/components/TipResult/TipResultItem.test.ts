import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TipResultItem from './TipResultItem.vue'

describe('TipResultItem.vue', () => {
  it('renders label and value with currency symbol', () => {
    const wrapper = mount(TipResultItem, {
      props: {
        label: 'Tip per person',
        value: '5.00',
        currencySymbol: 'R$',
      },
    })

    expect(wrapper.text()).toContain('Tip per person')
    expect(wrapper.text()).toContain('R$ 5.00')
  })

  it('uses default values when props are missing', () => {
    const wrapper = mount(TipResultItem)
    expect(wrapper.text()).toContain('$')
    expect(wrapper.text()).not.toContain('undefined')
  })

  it('applies correct classes', () => {
    const wrapper = mount(TipResultItem, {
      props: {
        label: 'Total',
        value: '12.34',
        currencySymbol: 'R$',
      },
    })

    const label = wrapper.find('span')
    const value = wrapper.find('p')

    expect(label.classes()).toContain('text-sm')
    expect(value.classes()).toContain('text-xl')
  })
})
