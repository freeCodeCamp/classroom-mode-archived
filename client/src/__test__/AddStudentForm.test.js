import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import mockAxios from 'axios'
import AddStudentForm from '../components/main/AddStudentForm'

Enzyme.configure({ adapter: new Adapter() })

describe('AddStudentForm', () => {
  let props
  let mountedAddStudentForm
  const addStudentForm = () => {
    if (!mountedAddStudentForm) {
      mountedAddStudentForm = mount(
        <AddStudentForm fetchStudentsFromParent={() => {}} />
      )
    }
    return mountedAddStudentForm
  }

  beforeEach(() => {
    mountedAddStudentForm = undefined
  })

  it('always renders a div', () => {
    const divs = addStudentForm().find('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('should open modal when open()', () => {
    addStudentForm()
      .instance()
      .open()
    expect(addStudentForm().instance().state.showModal).toBe(true)
  })

  it('should close modal when close()', () => {
    addStudentForm()
      .instance()
      .setState({ showModal: true })
    addStudentForm()
      .instance()
      .close()
    expect(addStudentForm().instance().state.showModal).toBe(false)
  })

  xit('should close the modal and set stage to completed when submitting returns a 200 response', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: 'OK', status: 200 })
    )

    addStudentForm()
      .find('button.open-modal')
      .simulate('click')
    await addStudentForm()
      .find('button.submit')
      .simulate('click')

    expect(addStudentForm().instance().state.showModal).toBe(false)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
  })

  // FIXME
  it('should show errors when submitting returns a 422 response', () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: { errors: ['Name is required.', 'Email is required.'] },
          status: 422,
        },
      })
    )

    addStudentForm()
      .find('button.open-modal')
      .simulate('click')
    addStudentForm()
      .find('button.submit')
      .simulate('click')

    setTimeout(() => {
      expect(addStudentForm().instance().state.showModal).toBe(true)
      expect(addStudentForm().instance().state.errors[0]).toEqual(
      'Name is required.'
      )
      expect(addStudentForm().instance().state.errors[1]).toEqual(
      'Email is required.'
      )
    }, 0)

  })

  it('should set state on handleChange', () => {
    const event = {
      target: {
        name: 'username',
        value: 'newValue',
      },
    }

    const addStudentFormComponentWrapperInstance = addStudentForm().instance()
    addStudentFormComponentWrapperInstance.handleChange(event)
    expect(addStudentFormComponentWrapperInstance.state.username).toEqual(
      'newValue'
    )
  })

  xit('triggers the fetchStudentsFromParent upon form submission', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: 'OK', status: 200 })
    )

    const fetchStudentsSpy = jest.spyOn(
      AddStudentForm.prototype,
      '_fetchStudentsFromParent'
    )
    addStudentForm()
      .find('button.open-modal')
      .simulate('click')
    await addStudentForm()
      .find('button.submit')
      .simulate('click')
    expect(fetchStudentsSpy).toHaveBeenCalled()
  })
})
