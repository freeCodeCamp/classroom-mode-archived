import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import ClassTable from './../ClassTable';
import mockResponse from './mock/response';

describe("ClassTable When Student List Is Empty", () => {
  let mountedClassTable;
  const classTable = () => {
    if (!mountedClassTable) {
      mountedClassTable = mount(
        <ClassTable students={[]} errors={["classroom is empty"]}/>
      );
    }
    return mountedClassTable;
  }

  it("always renders a div", () => {
    const divs = classTable().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("displays a special message if the student list is empty", () => {
    expect(classTable().find(".errors").text()).toEqual("classroom is empty");
  });

  it("do not display table if student list is empty", () => {
    expect(classTable().find("table").length).toEqual(0);
  });
});

describe("ClassTable When Student List Is Not Empty", () => {
  let mountedClassTable;
  const classTable = () => {
    if (!mountedClassTable) {
      mountedClassTable = mount(
        <ClassTable students={[{name: "Utsab", username: "utsab", email: "kdj@dfj", notes: "kdlfj"}]} />
      );
    }
    return mountedClassTable;
  };

  it("populates student data as a table", () => {
    expect(classTable().find('.students').length).toEqual(1);
    expect(classTable().find('table').length).toEqual(1);
    expect(classTable().find('th').length).toEqual(4);
    expect(classTable().find('td').length).toEqual(4);
    expect(classTable().find('tr').last().childAt(0).text()).toEqual('Utsab');
    expect(classTable().find('tr').last().childAt(1).text()).toEqual('utsab');
    expect(classTable().find('tr').last().childAt(2).text()).toEqual('kdj@dfj');
    expect(classTable().find('tr').last().childAt(3).text()).toEqual('kdlfj');
  });

  it("does not render errors div", () => {
    expect(classTable().find('.errors').length).toEqual(0);
  });
});