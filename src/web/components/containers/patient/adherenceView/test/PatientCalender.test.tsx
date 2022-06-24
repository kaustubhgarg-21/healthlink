import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PatientCalendar from "../../../../stateless/patient/scheduleCalender";
configure({ adapter: new Adapter() });
describe("Patient Calender", () => {
  const wrapper = shallow(<PatientCalendar />);
  it("Class Check", () => {
    expect(wrapper.exists(".dateFormat")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-20")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".scheduleTitle")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".dateMenu")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".time-col")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".material-icons-outlined")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".durationSelector")).toBe(true);
  });
});