import { configure, shallow } from "enzyme";
import Adopter from "enzyme-adapter-react-16";
import BloodPressureCard from "../../../../stateless/patient/patientThreshold/patientBp";
configure({ adapter: new Adopter() });
var obj = {
  abc: "",
};
describe("BloodPressure", () => {
  const wrapper = shallow(<BloodPressureCard el={obj} />);

  it("Check for class", () => {
    expect(wrapper.exists(".bpCardContainer")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".bpCard")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".drTxt")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".f-16")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".bpCardTxt")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".bloodPressureTxt")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".downArrow")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".systolicTxtNmbr")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".bloodPressureTxt")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".systolicTxtNmbr")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".material-icons-outlined")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".thresholdSelect")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".card-dropdown")).toBe(true);
  });
  it("Check for class", () => {
    expect(wrapper.exists(".with-search")).toBe(true);
  });

    it("Edit Button Check", () => {
      var fun=jest.fn();
      const but = wrapper.find(".material-icons-outlined");
      but.simulate("click");     
      expect(fun).toBeCalled;
    });
    it("Select Input Box Check", () => {
      expect(
        wrapper
          .find('[name="role"][className="card-dropdown with-search"]')
          .exists()
      );
    });
 
    it("Save Changes Button Check", () => {
      const but = wrapper.find(".filter");
      var fun=jest.fn();
      but.simulate("click");
      expect(fun).toBeCalled;
    });
});