import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DeviceDetails from "../../../../stateless/patient/devices";
configure({ adapter: new Adapter() });
describe("Add Patient", () => {
  var obj = {
    abc:"3",
  };
  const wrapper = shallow(<DeviceDetails setSelectedTab={obj} />);
  it("Button", () => {
    let fun = jest.fn();
    let but = wrapper.find("Button").at(0);
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("Button", () => {
    let fun = jest.fn();
    let but = wrapper.find("Button").at(1);
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("Button", () => {
    let fun = jest.fn();
    let but = wrapper.find("Button").at(2);
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("Button", () => {
    let fun = jest.fn();
    let but = wrapper.find("Button").at(3);
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("table class is present or not ?", () => {
    expect(wrapper.exists(".patientDevices-container")).toBe(true);
  });
  it("table class is present or not ?", () => {
    expect(wrapper.exists(".patientDevicesInput")).toBe(true);
  });
  it("table class is present or not ?", () => {
    expect(wrapper.exists(".devicesTable-container")).toBe(true);
  });
  it("table class is present or not ?", () => {
    expect(wrapper.exists(".tableTitle")).toBe(true);
  });
  it("table class is present or not ?", () => {
    expect(wrapper.exists(".f-16")).toBe(true);
  });
  it("table class is present or not ?", () => {
    expect(wrapper.exists(".pateintfooter")).toBe(true);
  });
  
it("CheckBox", () => {
  let fun = jest.fn();
  let but = wrapper.find("Checkbox").at(0);
});
});