import Enzyme, { mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import App from './../App';
import mockResponse from './mock/response';

describe("App", () => {
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <App/>
      );
    }
    return mountedApp;
  };

  beforeAll(() =>{
    window.fetch = jest.fn().mockImplementation(function() {
      return Promise.resolve(mockResponse(200, null, JSON.stringify([])));
    });
  });

  afterAll(() =>{
    window.fetch.mockReset();
  });

  it("always renders a div", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always render AddStudentForm", () => {
    expect(app().find(".AddStudentForm")).toHaveLength(1);
  });

  it("always render ClassTable", () => {
    expect(app().find(".ClassTable")).toHaveLength(1);
  });

});
