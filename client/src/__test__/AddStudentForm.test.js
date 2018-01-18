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

    var addStudentFormComponentWrapper = addStudentForm();
    await addStudentFormComponentWrapper.find('button.open-modal').simulate('click');
    await addStudentFormComponentWrapper.find('button.submit').simulate('click');
    
    let modalComponent = addStudentFormComponentWrapper.find('.add-student-modal').get(0);
    
    console.log("*******************************"); 
    console.log("modal at 0: ", modalComponent.props.show); 
    //TODO: check whether modalComponent.props.show has the right value (should be false). 
    //console.log("modal component props: ", modalComponent.props()); 
  });

  it("should returns errors and not close modal when submitting returns a non 200", async () => {
    window.fetch = jest.fn().mockImplementation(function() {
        return Promise.resolve(mockResponse(422, null, JSON.stringify({errors: ["Name is wrong", "Email is wrong"]})));
      }
    );

    var addStudentFormComponentWrapper = addStudentForm();
    await addStudentFormComponentWrapper.find('button.open-modal').simulate('click');
    await addStudentFormComponentWrapper.find('button.submit').simulate('click');
    expect(addStudentFormComponentWrapper.instance().state.showModal).toBe(true);
    expect(addStudentFormComponentWrapper.instance().state.errors[0]).toEqual("Name is wrong");
    expect(addStudentFormComponentWrapper.instance().state.errors[1]).toEqual("Email is wrong");
  });
  
  it("snapshot - should close the modal when submitting returns a 200 response", () => {
    // window.fetch = jest.fn().mockImplementation(function() {
    //     return Promise.resolve(mockResponse(200, null, '{}'));
    //   }
    // );

    let studentForm = renderer.create(<AddStudentForm {...props} />).toJSON();
    // studentForm.find('button.open-modal').simulate('click');
    // studentForm.find('button.submit').simulate('click');
    
    expect(studentForm).toMatchSnapshot();
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