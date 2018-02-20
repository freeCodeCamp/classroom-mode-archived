import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import ClassTable from './../ClassTable';
import mockResponse from './mock/response';

describe("ClassTable When Student List Is Empty", () => {
  beforeAll(() =>{
    window.fetch = jest.fn().mockImplementation(function() {
      return Promise.resolve(mockResponse(200, null, JSON.stringify([])));
    })
  });

  afterAll(() =>{
    window.fetch.mockReset();
  });

  let props;
  let mountedClassTable;
  const classTable = () => {
    if (!mountedClassTable) {
      mountedClassTable = mount(
        <ClassTable {...props} />
      );
    }
    return mountedClassTable;
  }

  it("always renders a div", () => {
    const divs = classTable().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("fetches GET /students", () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    expect(fetchSpy).toHaveBeenCalledWith('/students');
  });

  it("displays a special message if the student list is empty", () => {
    expect(classTable().find(".errors").text()).toEqual("classroom is empty");
  });
});

describe("ClassTable When Student List Is Not Empty", () => {
  beforeAll(() =>{
    window.fetch = jest.fn().mockImplementation(function() {
      return Promise.resolve(mockResponse(200, null, JSON.stringify([{"_id":"5a87b0f78706f6070dea47c7","name":"Bob","username":"utsab","email":"a@b.com","notes":"","__v":0}])));
    })
  });

  afterAll(() =>{
    window.fetch.mockReset();
  });

  let props;
  let mountedClassTable;
  const classTable = () => {
    if (!mountedClassTable) {
      mountedClassTable = mount(
        <ClassTable {...props} />
      );
    }
    return mountedClassTable;
  };

  it("sets the react state with the student list returned from the server", () => {
    return classTable().instance().componentDidMount().then().then(data => {
      expect(classTable().instance().state.students[0].username).toEqual('utsab')
    });
  });

  it("populates student data as a table", () => {
    classTable()
      .setState({ students: [{name: "Utsab", username: "utsab", email: "kdj@dfj", notes: "kdlfj"}]})
    expect(classTable().find('.students').length).toEqual(1);
    expect(classTable().find('table').length).toEqual(1);
    expect(classTable().find('th').length).toEqual(4);
    expect(classTable().find('td').length).toEqual(4);
    expect(classTable().find('tr').last().childAt(0).text()).toEqual('Utsab');
    expect(classTable().find('tr').last().childAt(1).text()).toEqual('utsab');
    expect(classTable().find('tr').last().childAt(2).text()).toEqual('kdj@dfj');
    expect(classTable().find('tr').last().childAt(3).text()).toEqual('kdlfj');
  });
});