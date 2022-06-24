import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateCustomRole from "..";
configure({ adapter: new Adapter() });
describe("Creat Custom Role testing ", () => {
  const wrapper = shallow(<CreateCustomRole />);
  it("SAVE button", () => {
    var fun = jest.fn();
    let but = wrapper.find(".saveButton");
    console.log(but.debug());
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("Class Check", () => {
    expect(wrapper.exists(".innerHeader")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".addRoleHeader")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-18")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".saveButton")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".card")).toBe(true);
  });
});