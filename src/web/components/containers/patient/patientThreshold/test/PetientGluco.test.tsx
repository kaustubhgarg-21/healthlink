import { configure, shallow } from "enzyme";
import Adaptert from "enzyme-adapter-react-16";
import PatientGluco from "../../../../stateless/patient/patientThreshold/patientGluco";
configure({ adapter: new Adaptert() });
var obj = {
  abs: " ",
};
describe("Patient Gloco", () => {
  const wrapper = shallow(<PatientGluco el={obj} />);
  it("Check for classes", () => {
    expect(wrapper.exists(".bpCardContainer")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".bpCardTxt")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".downArrow")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".material-icons-outlined")).toBe(true);
  });
  it("Click check", () => {
    let aa = wrapper.find(".material-icons-outlined").at(0);
    aa.simulate("click");
  });
  it("Check for SelectInput", () => {
    expect(
      wrapper.exists(
        'SelectInput[placeholder="select"][name="role"][className="card-dropdown with-search"]'
      )
    ).toBe(true);
  });
  it("Button check", () => {
    var fun = jest.fn();
    let but = wrapper.find("Button").at(0);
    but.simulate("Click");
    expect(fun).toBeCalled;
  });
});