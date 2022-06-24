import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SpecialityList } from "..";
configure({ adapter: new Adapter() });
describe("Speciality", () => {
  const wrapper = shallow(<SpecialityList />);
  it("Class Check", () => {
    expect(wrapper.exists(".innerHeader")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".brdOrg")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-20")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".saveOrgBtn")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".specialityCard")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".tableSpecial")).toBe(true);
  });
  it("Button testing for SAVE", () => {
    const but = wrapper.find(
      '[type="primary"][className="saveOrgBtn"][htmlType="submit"][form="organisationAdd"]'
    );
    var fun = jest.fn();
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("Input Box Check", () => {
    expect(wrapper.exists("InputBox")).toBe(true);
  });
});