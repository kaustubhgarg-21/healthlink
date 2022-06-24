import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ProviderTableList } from "../../../../stateless/patient/providerTable";
configure({ adapter: new Adapter() });
describe("Add Patient", () => {
  let wrapper = shallow(<ProviderTableList />);
  it("Class check", () => {
    expect(wrapper.exists(".familyTable")).toBe(true);
  });
  it("Class check", () => {
    expect(wrapper.exists(".NewProviderRow")).toBe(true);
  });
  it("Class check", () => {
    expect(wrapper.exists(".providerClass")).toBe(true);
  });
  it("Class check", () => {
    expect(wrapper.exists(".addOrgBtn")).toBe(true);
  });
  it("Class check", () => {
    expect(wrapper.exists(".material-icons-outlined")).toBe(true);
  });
  it("Selection Box Check", () => {
    expect(
      wrapper.exists('SelectInput[name="provider"][className="providerClass"]')
    ).toBe(true);
  });
  it("InputBox Check", () => {
    expect(wrapper.exists('InputBox[name="Name"][initialValue="Name"]')).toBe(
      true
    );
  });
  it("Button Check", () => {
    var fun = jest.fn();
    let but = wrapper.find("Button").at(0);
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("Button Check", () => {
    var fun = jest.fn();
    let but = wrapper.find("Button").at(1);
    but.simulate("click");
    expect(fun).toBeCalled;
  });
});