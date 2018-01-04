import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { mount } from "enzyme";
import ReactDOM from 'react-dom';
import AddStudentForm from './../AddStudentForm';

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
    const mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
          'Content-type': 'application/json'
        }
      });
    };

    window.fetch = jest.fn().mockImplementation(function() {
        console.log("In the mocked fetch function");
        return Promise.resolve(mockResponse(200, null, '{"foo":"bar"}'));
      }
    );

    var addStudentFormComponentWrapper = addStudentForm();
    addStudentFormComponentWrapper.instance().open();
    await addStudentFormComponentWrapper.instance().submit();
    expect(addStudentFormComponentWrapper.instance().state.showModal).toBe(false);
  });

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