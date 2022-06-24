import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ComplianceReview from "..";
configure({ adapter: new Adapter() });
describe("compliance review test", () => {
  const wrapper = shallow(<ComplianceReview />);
  it("Class Check", () => {
    expect(wrapper.exists(".complianceRow")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".adherenceCard")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".rowAdherence")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".adherenceHeader")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".icon")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".tableSpecial")).toBe(true);
  });
  it(" Button", () => {
    let but = wrapper.find(".icon");
  });
});