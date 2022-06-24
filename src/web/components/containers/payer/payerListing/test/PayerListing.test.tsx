import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PayerList } from "..";
configure({ adapter: new Adapter() });
describe("payer listing test", () => {
  const wrapper = shallow(<PayerList />);
  it("Class Check", () => {
    expect(wrapper.exists(".listContainer")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".innerHeader")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".platformUsers")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-20")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".filterIcon")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".listHeader")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".orgListHead")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".upIcon")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".cityStyle")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".userFilter")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".gridIcon")).toBe(true);
  });
  it(" Add Payer Button", () => {
    let fun = jest.fn();
    let but = wrapper.find("Button").at(0);
  });
});