import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from '../components/home/Home'

Enzyme.configure({ adapter: new Adapter() })

describe('Home When Student List Is Empty', () => {
  let mountedHome
  const homePage = () => {
    if (!mountedHome) {
      mountedHome = mount(
        <Home students={[]} errors={['classroom is empty']} />
      )
    }
    return mountedHome
  }

  it('always renders a div', () => {
    const divs = homePage().find('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('displays a special message if the student list is empty', () => {
    expect(
      homePage()
        .find('.has-no-students')
        .text()
    ).toEqual('This classroom is empty')
  })

  it('do not display table if student list is empty', () => {
    expect(homePage().find('table').length).toEqual(0)
  })
})

describe('Home When Student List Is Not Empty', () => {
  let mountedHome
  const homePage = () => {
    if (!mountedHome) {
      mountedHome = mount(
        <Home
          students={[
            {
              name: 'Utsab',
              username: 'utsab',
              email: 'kdj@dfj',
              notes: 'kdlfj',
              daysInactive: 1,
              newSubmissionsCount: 2,
            },
          ]}
        />
      )
    }
    return mountedHome
  }

  it('populates student data as a table', () => {
    expect(homePage().find('.students').length).toEqual(1)
    expect(homePage().find('table').length).toEqual(1)
    expect(homePage().find('th').length).toEqual(7)
    expect(homePage().find('td').length).toEqual(7)
    expect(
      homePage()
        .find('tr')
        .last()
        .childAt(0)
        .text()
    ).toEqual('Utsab')
    expect(
      homePage()
        .find('tr')
        .last()
        .childAt(1)
        .text()
    ).toEqual('utsab')
    expect(
      homePage()
        .find('tr')
        .last()
        .childAt(2)
        .text()
    ).toEqual('kdj@dfj')
    expect(
      homePage()
        .find('tr')
        .last()
        .childAt(3)
        .text()
    ).toEqual('kdlfj')
    expect(
      homePage()
        .find('tr')
        .last()
        .childAt(4)
        .text()
    ).toEqual('1')
    expect(
      homePage()
        .find('tr')
        .last()
        .childAt(5)
        .text()
    ).toEqual('2')
  })

  it('does not render errors div', () => {
    expect(homePage().find('.errors').length).toEqual(0)
  })
})
