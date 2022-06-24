import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Dashboard } from "..";
configure({ adapter: new Adapter() });
describe("check for deshbord", () => {
  const wrapper = shallow(<Dashboard />);
  it("Class Check", () => {
    expect(wrapper.exists(".innerHeader")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".dashBoardPage")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-20")).toBe(true);
  });
});