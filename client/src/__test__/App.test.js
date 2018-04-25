import Enzyme, { mount } from 'enzyme'
import React from 'react'
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
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockResponse(200, null, JSON.stringify(studentObjects)))
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
    const fetchSpy = jest.spyOn(window, 'fetch')
    expect(fetchSpy).toHaveBeenCalledWith('/students')
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

  it('it passes fetchStudentList function to AddStudentForm ', () => {
    expect(
      app()
        .find('AddStudentForm')
        .prop('fetchStudentsFromParent')
    ).toBeInstanceOf(Function)
    expect(
      app()
        .find('AddStudentForm')
        .prop('fetchStudentsFromParent').name
    ).toEqual('bound fetchStudentList')
  })
})
