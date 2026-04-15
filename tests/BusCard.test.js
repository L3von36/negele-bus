import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BusCard from '../src/components/BusCard.vue'

describe('BusCard', () => {
  const defaultProps = {
    name: 'Test Bus',
    seats: '25 seats available',
    price: 'ETB 500',
    time: '8:00 AM',
    hasVip: false
  }

  it('renders bus name correctly', () => {
    const wrapper = mount(BusCard, {
      props: defaultProps
    })
    expect(wrapper.text()).toContain('Test Bus')
  })

  it('displays price correctly', () => {
    const wrapper = mount(BusCard, {
      props: defaultProps
    })
    expect(wrapper.text()).toContain('ETB 500')
  })

  it('shows VIP badge when hasVip is true', () => {
    const wrapper = mount(BusCard, {
      props: {
        ...defaultProps,
        hasVip: true
      }
    })
    expect(wrapper.text()).toContain('VIP')
  })

  it('does not show VIP badge when hasVip is false', () => {
    const wrapper = mount(BusCard, {
      props: {
        ...defaultProps,
        hasVip: false
      }
    })
    expect(wrapper.text()).not.toContain('VIP')
  })

  it('displays seat information', () => {
    const wrapper = mount(BusCard, {
      props: defaultProps
    })
    expect(wrapper.text()).toContain('25 seats available')
  })

  it('displays time information', () => {
    const wrapper = mount(BusCard, {
      props: defaultProps
    })
    expect(wrapper.text()).toContain('8:00 AM')
  })
})
