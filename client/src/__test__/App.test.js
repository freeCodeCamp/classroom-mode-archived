import Enzyme, { mount } from 'enzyme'
import React from 'react'
import mockAxios from 'axios'
import Adapter from 'enzyme-adapter-react-16'
import App from '../containers/App'
import mockResponse from './mock/response'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  let mountedApp
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(<App />)
    }
    return mountedApp
  }

  const studentObjects = [
    {
      _id: '5a87b0f78706f6070dea47c7',
      name: 'Bob',
      username: 'utsab',
      email: 'a@b.com',
      notes: '',
      __v: 0,
      daysInactive: 1,
    },
  ]

  beforeAll(() => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: studentObjects, status: 200 })
    )
  })

  afterAll(() => {
    window.fetch.mockReset()
  })

  it('always renders a div', () => {
    const divs = app().find('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('always render NavBar', () => {
    expect(app().find('.NavBar')).toHaveLength(1)
  })

  it('always render AddStudentForm', () => {
    expect(app().find('.AddStudentForm')).toHaveLength(1)
  })

  it('always render ClassTable', () => {
    expect(app().find('.ClassTable')).toHaveLength(1)
  })

  it('fetches GET /students', () => {
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith('/students')
  })

  it('passes students props to ClassTable', () => {
    expect(
      app()
        .update()
        .find('ClassTable')
        .prop('students')
    ).toEqual(studentObjects)
    expect(
      app()
        .update()
        .find('ClassTable')
        .prop('students')[0].daysInactive
    ).toEqual(1)
  })
})
