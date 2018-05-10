import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AddStudentForm from '../components/AddStudentForm'
import mockResponse from './mock/response'
import mockAxios from 'axios';

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

  it('should close the modal and set stage to completed when submitting returns a 200 response', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve(
        {data: "OK", status: 200}
      )
    );

    addStudentForm()
      .find('button.open-modal')
      .simulate('click')
    await addStudentForm()
      .find('button.submit')
      .simulate('click')

    expect(addStudentForm().instance().state.showModal).toBe(false)
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  })

  it('should show errors when submitting returns a 400 response', done => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve(
        {
          data: { errors: ['Name is wrong', 'Email is wrong'] },
          status: 422
        }
      )
    );

    addStudentForm()
      .find('button.open-modal')
      .simulate('click')
    addStudentForm()
      .find('button.submit')
      .simulate('click')


    setImmediate( () => {
      expect(addStudentForm().instance().state.showModal).toBe(true)
      expect(addStudentForm().instance().state.errors[0]).toEqual(
        'Name is wrong'
      )
      expect(addStudentForm().instance().state.errors[1]).toEqual(
        'Email is wrong'
      )
      done();
    })
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

  it('triggers the fetchStudentsFromParent upon form submission', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve(
        {data: "OK", status: 200}
      )
    );

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
