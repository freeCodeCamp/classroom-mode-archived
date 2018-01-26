import React from 'react';
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import ReactDOM from 'react-dom';
import AddStudentForm from './../AddStudentForm';
import mockResponse from './mock/response';
import renderer from 'react-test-renderer';

describe("AddStudentForm", () => {
  let props;
  let mountedAddStudentForm;
  const addStudentForm = () => {
    if (!mountedAddStudentForm) {
      mountedAddStudentForm = mount(
        <AddStudentForm {...props} />
      );
    }
    return mountedAddStudentForm;
  }

  beforeEach(() => {
    props = {
      wallpaperPath: undefined,
      userInfoMessage: undefined,
      onUnlocked: undefined,
    };
    mountedAddStudentForm = undefined;
  });

  it("always renders a div", () => {
    const divs = addStudentForm().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("should open modal when open()", () => {
    addStudentForm().instance().open();
    expect(addStudentForm().instance().state.showModal).toBe(true);
  });

  it("should close modal when close()", () => {
    addStudentForm().instance().setState({showModal: true});
    addStudentForm().instance().close();
    expect(addStudentForm().instance().state.showModal).toBe(false)
  });

  it("should close the modal when submitting returns a 200 response", async () => {
    window.fetch = jest.fn().mockImplementation(function() {
        return Promise.resolve(mockResponse(200, null, '{}'));
      }
    );

    addStudentForm().find('button.open-modal').simulate('click');
    await addStudentForm().find('button.submit').simulate('click');
    
    expect(addStudentForm().instance().state.showModal).toBe(false);
  });
  
  it("should return errors when submit", () => {
    window.fetch = jest.fn().mockImplementation(function() {
        return Promise.resolve(mockResponse(422, null, JSON.stringify({errors: ["Name is wrong", "Email is wrong"]})));
      }
    );
    addStudentForm().find('button.open-modal').simulate('click');
    return addStudentForm().instance().submit().then().then(data => {
      expect(addStudentForm().instance().state.showModal).toBe(true);
      expect(addStudentForm().instance().state.errors[0]).toEqual('Name is wrong');
      expect(addStudentForm().instance().state.errors[1]).toEqual('Email is wrong');
    });
  });
  
  it("should invoke submit() when submit button is clicked", () => {
    const submitSpy = jest.spyOn(AddStudentForm.prototype, 'submit');

    addStudentForm().find('button.open-modal').simulate('click');
    addStudentForm().find('button.submit').simulate('click');
    expect(submitSpy).toHaveBeenCalled();
  })

  it("should set state on handleChange", () => {
    let event = {
      target: {
        name: 'username',
        value: 'newValue'
      }
    }

    let addStudentFormComponentWrapperInstance = addStudentForm().instance();
    addStudentFormComponentWrapperInstance.handleChange(event);
    expect(addStudentFormComponentWrapperInstance.state.username).toEqual('newValue');
  });
});