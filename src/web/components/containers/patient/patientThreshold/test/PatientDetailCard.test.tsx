import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Patient from "../../../../../models/patient/patient";
import { PatientDetailCard } from "../../../../stateless/patient/detailsCard";
configure({ adapter: new Adapter() });
var obj = {
  
};
describe("Patient Detail Card", () => {
  const wrapper = shallow(<PatientDetailCard patient={obj as Patient} />);
  it("Class Check", () => {
    expect(wrapper.exists(".patientDetailsCard")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".pt-10")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".patientName")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".pateintType")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-12")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".patientDetails")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".key")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".value")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".addNotes")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".material-icons-outlined")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".calendar")).toBe(true);
  });
  
  it("Dropdown Input Box Check", () => {
    expect(wrapper.exists('Dropdown')).toBe(true);
  });
});