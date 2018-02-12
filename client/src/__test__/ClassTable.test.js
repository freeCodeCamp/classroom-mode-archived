import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import ClassTable from './../ClassTable';

describe("ClassTable", () => {
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
})
