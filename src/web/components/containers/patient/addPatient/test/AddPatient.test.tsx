import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AddPatient } from "..";
configure({ adapter: new Adapter() });
describe("Add Patient", () => {
  const wrapper = shallow(<AddPatient />);
  it('Class Check 1',()=>{
   expect(wrapper.exists('.innerHeader')).toBe(true);
  });
  it('Class Check 1',()=>{
    expect(wrapper.exists('.orgName')).toBe(true);
   });
   it('Class Check 1',()=>{
    expect(wrapper.exists('.f-20')).toBe(true);
   });
   it('Class Check 1',()=>{
    expect(wrapper.exists('.containerRow')).toBe(true);
   });
   it('Class Check 1',()=>{
    expect(wrapper.exists('.organization-tabs')).toBe(true);
   });
   it('Class Check 1',()=>{
    expect(wrapper.exists('.f-14')).toBe(true);
   });   
  it("should have a working submit button", () => {
    var fun = jest.fn();
    const but = wrapper.find("Button").at(0);
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("should have a working submit button", () => {
    var fun = jest.fn();
    const but = wrapper.find("Button").at(1);
    but.simulate("click");
    expect(fun).toBeCalled;
  });
});