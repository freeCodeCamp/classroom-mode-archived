import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { FormControl } from 'react-bootstrap'
import EditStudent from '../components/main/EditStudent'

enzyme.configure({ adapter: new Adapter() })

describe('EditStudent component', () => {
  const mockProps = {
    onSuccessfulSubmission: jest.fn(),
    onClose: jest.fn(),
  }
  const shallowEditStudentComponent = shallow(<EditStudent {...mockProps} />)
  describe('EditStudent layout', () => {
    it('should have a name FormControl field', () => {
      const nameInput = shallowEditStudentComponent.find('[name="name"]')
      expect(nameInput).toHaveLength(1)
      expect(nameInput.type()).toEqual(FormControl)
    })

    it('should have a email field', () => {
      const emailInput = shallowEditStudentComponent.find('[name="email"]')
      expect(emailInput).toHaveLength(1)
      expect(emailInput.type()).toEqual(FormControl)
    })

    it('should have a notes field', () => {
      const notesInput = shallowEditStudentComponent.find('[name="notes"]')
      expect(notesInput).toHaveLength(1)
      expect(notesInput.type()).toEqual(FormControl)
    })

    describe('close button', () => {
      let closeButton
      beforeAll(() => {
        closeButton = shallowEditStudentComponent.find('Button').at(0)
      })

      it('should exist', () => {
        expect(closeButton).toHaveLength(1)
      })

      it('should call onClose when clicked', () => {
        closeButton.simulate('click')
        expect(
          shallowEditStudentComponent.instance().props.onClose
        ).toHaveBeenCalledTimes(1)
      })
    })

    describe('submit button', () => {
      let submitButton
      beforeAll(() => {
        submitButton = shallowEditStudentComponent.find('Button').at(1)
      })

      it('should exist', () => {
        expect(submitButton).toHaveLength(1)
      })

      it('should call onSuccessfulSubmission when clicked sucessfully editing student', async () => {
        await submitButton.simulate('click')
        expect(mockProps.onSuccessfulSubmission).toHaveBeenCalledTimes(1)
      })
    })
  })
})
