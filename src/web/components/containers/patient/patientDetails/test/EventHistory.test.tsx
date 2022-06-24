import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { EventHistory } from "../../../../stateless/patient/eventHistory";
configure({ adapter: new Adapter() });
describe("Event History test", () => {
  const wrapper = shallow(<EventHistory />);
  it("Class Check", () => {
    expect(wrapper.exists(".eventHistoryCard")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".eventHistorButton")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".textFont")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-16")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".emailProviderHistory")).toBe(true);
  });

  it("Class Check", () => {
    expect(wrapper.exists(".f-14")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".editIcon")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".buttonSchedule")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".providerButton")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".textFont")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".buttonText")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".dobText")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".dobPicker")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".tableContainer")).toBe(true);
  });
});