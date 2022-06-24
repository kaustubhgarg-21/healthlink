import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ProviderTableList } from "../../../../stateless/patient/providerTable";
configure({ adapter: new Adapter() });
describe("provider Details", () => {
  const wrapper = shallow(<ProviderTableList />);
  it("Class Check", () => {
    expect(wrapper.exists(".familyTable")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".NewProviderRow")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".providerClass")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".addOrgBtn")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".material-icons-outlined")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".pateintfooter")).toBe(true);
  });
  it("Check for existance", () => {
    expect(
      wrapper.exists('SelectInput[name="provider"][className="providerClass"]')
    ).toBe(true);
  });
  it("Check for SelectInput", () => {
    expect(
      wrapper.exists('SelectInput[name="provider"][className="providerClass"]')
    ).toBe(true);
  });
  it("Check for InputBox", () => {
    expect(wrapper.exists('InputBox[name="Name"][initialValue="Name"]')).toBe(
      true
    );
  });
  it("button check", () => {
    const but = wrapper.find('[type="primary"][className="addOrgBtn"]');
    but.simulate("click");
    expect(but).toBeCalled;
  });
});