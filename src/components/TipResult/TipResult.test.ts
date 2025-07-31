import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TipResult from './TipResult.vue'

describe('TipResult.vue', () => {
  it('renders all TipResultItem components with correct labels and values', () => {
    const wrapper = mount(TipResult, {
      props: {
        checkTotal: 100,
        tipValue: 15,
        totalValue: 115,
        totalPerPerson: 28.75,
        totalPerPersonInBrl: 140,
        currencySymbol: '$',
      },
    })

    const labels = ['Conta', 'Gorjeta', 'Total', 'por pessoa', 'em R$']
    const values = ['$ 100', '$ 15', '$ 115', '$ 28.75', 'R$ 140']

    labels.forEach((label) => {
      expect(wrapper.text()).toContain(label)
    })

    values.forEach((value) => {
      expect(wrapper.text()).toContain(value)
    })
  })

  it('uses default props when none are passed', () => {
    const wrapper = mount(TipResult)
    const expectedValues = ['$ 0', '$ 0', '$ 0', '$ 0', 'R$ 0']

    expectedValues.forEach((value) => {
      expect(wrapper.text()).toContain(value)
    })
  })

  it('uses custom currencySymbol correctly except for the last item', () => {
    const wrapper = mount(TipResult, {
      props: {
        checkTotal: 10,
        tipValue: 2,
        totalValue: 12,
        totalPerPerson: 6,
        totalPerPersonInBrl: 30,
        currencySymbol: '€',
      },
    })

    expect(wrapper.text()).toContain('€ 10')
    expect(wrapper.text()).toContain('€ 2')
    expect(wrapper.text()).toContain('€ 12')
    expect(wrapper.text()).toContain('€ 6')
    expect(wrapper.text()).toContain('R$ 30')
  })
})
