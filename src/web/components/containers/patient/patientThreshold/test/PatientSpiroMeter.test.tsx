import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PatientSpirometer from "../../../../stateless/patient/patientThreshold/patientSpirometer";
configure({ adapter: new Adapter() });
var obj = {
 abc: "",
};
describe("Patient Spirometer", () => {
 const wrapper = shallow(<PatientSpirometer el={obj} />);
 it('Class Check', () => {
   expect(wrapper.exists(".bpCardContainer")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".bpCard")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".drTxt")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".f-16")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".bpCardTxt")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".bloodPressureTxt")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".f-12")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".systolicTxt")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".systolicTxtNmbr")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".downArrow")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".material-icons-outlined")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".thresholdSelect")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".card-dropdown")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".with-search")).toBe(true);
 });
  it("SelectInput check",() => {
   expect(wrapper.exists('SelectInput[placeholder="select"][name="role"]')).toBe(true);
 });
  it("Check for Edit Click", () => {
   const but = wrapper.find(".material-icons-outlined");
    but.simulate("click");
    expect(but).toBeChecked;
 });
 it("Button Check", () => {
   var fun= jest.fn();
  const but = wrapper.find("Button").at(0);
   but.simulate("click");
   expect(fun).toBeChecked;
 });
 });
